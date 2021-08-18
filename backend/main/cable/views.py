from rest_framework import permissions, viewsets, generics, status
from .serializers import CableJournalSerializer
from .models import CableJournal
from rest_framework.filters import OrderingFilter
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import HttpResponse
import xlsxwriter
import json
import numpy as np
import io
import os
from docxtpl import DocxTemplate
from main.settings import MEDIA_ROOT


# ViewSet with ability to add multiple records with 1 request
class CableJournalViewSet(viewsets.ModelViewSet):
    queryset = CableJournal.objects.all()
    serializer_class = CableJournalSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=isinstance(request.data, list))
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class CableJournalBySystemByObject(generics.ListAPIView):
    serializer_class = CableJournalSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [OrderingFilter]
    ordering = '__all__'

    def get_queryset(self):
        object_id = self.kwargs['id']
        system_name = self.kwargs['system']
        return CableJournal.objects.filter(object=object_id, system=system_name)


class CableJournalUpdateView(generics.UpdateAPIView):
    queryset = CableJournal.objects.all()
    serializer_class = CableJournalSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'


class CableJournalDeleteView(APIView):
    serializer_class = CableJournalSerializer

    def post(self, request, *args, **kwargs):
        cj_data = request.data
        for i in cj_data:
            CableJournal.objects.filter(id=i).delete()
        return Response(request.data)


class ExportView(APIView):
    serializer_class = CableJournalSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        object_id = self.kwargs['id']
        system_name = self.kwargs['system']
        cj = CableJournal.objects.filter(object=object_id, system=system_name).order_by('index')
        return cj

    def get(self, request, *args, **kwargs):
        cj = self.get_queryset()
        serializer = CableJournalSerializer(cj, many=True)
        export_array = []
        for i in serializer.data:
            dict_excel = json.loads(json.dumps(i))
            array_row = [dict_excel['name'], dict_excel['start'], dict_excel['end'], dict_excel['cable'],
                         dict_excel['cable_cut'], dict_excel['length']]
            export_array.append(array_row)
        # Excel export
        output = io.BytesIO()
        workbook = xlsxwriter.Workbook(output)
        worksheet = workbook.add_worksheet()
        for row_num, columns in enumerate(export_array):
            for col_num, cell_data in enumerate(columns):
                worksheet.write(row_num, col_num, cell_data)
        workbook.close()
        output.seek(0)
        filename = 'django_simple.xlsx'
        response = HttpResponse(
            output,
            content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        )
        response['Content-Disposition'] = 'attachment; filename=%s' % filename
        return response


class CableJournalSetLengthView(APIView):
    serializer_class = CableJournalSerializer

    def post(self, request, *args, **kwargs):
        req_data = request.data
        total_length = float(req_data['length'])
        cables = req_data['cables']
        variance = req_data['variance']
        needed_list = []
        # Low variance
        if variance == 'low':
            needed_number = len(cables)
            default_average = float(total_length) / needed_number
            default_deviation = float(default_average) * 0.15
            print(default_deviation)
            for i in range(needed_number):
                # Decide to increase or decrease the amount
                decider = np.random.randint(0, 1 + 1)
                # If decider is 0 - decrease, if 1 - increase
                if decider == 0:
                    # Determine the value to decrease by
                    value_decider = np.random.uniform(0, default_deviation)
                    random_value = round((default_average - value_decider), 1)
                    needed_list.append(random_value)
                elif decider == 1:
                    # Determine the value to increase by
                    value_decider = np.random.uniform(0, default_deviation)
                    random_value = round((default_average + value_decider), 1)
                    needed_list.append(random_value)
            # count the sum of resulting values in the list
            actual_total = 0
            for i in needed_list:
                actual_total += i
            # if the resulting total is less than requested, compensate by adding missing numbers to all entries
            if float(actual_total) < float(total_length):
                missing_number = total_length - actual_total
                number_of_entries = len(needed_list)
                amount_to_add = missing_number / number_of_entries
                for i in range(len(needed_list)):
                    needed_list[i] += round(amount_to_add, 1)
            # if the resulting number is higher make numbers smaller
            elif float(actual_total) > float(total_length):
                print('MORE')
                missing_number = actual_total - total_length
                number_of_entries = len(needed_list)
                amount_to_add = missing_number / number_of_entries
                for i in range(len(needed_list)):
                    needed_list[i] -= round(amount_to_add, 1)
            # count actual total again
            actual_total = 0
            for i in needed_list:
                actual_total += i
            # Setting the length in the database
            for i in range(len(cables)):
                num = cables[i]
                chosen_object = CableJournal.objects.filter(id=num)[0]
                chosen_object.length = round(float(needed_list[i]), 1)
                chosen_object.save()
        # High variance
        if variance == 'high':
            needed_number = len(cables)
            random_stuff = np.random.dirichlet(np.ones(needed_number), size=1)
            random_stuff_bigger = []
            total = 0
            for i in random_stuff[0]:
                fixed = round((float(i) * total_length), 1)
                random_stuff_bigger.append(fixed)
                total = total + fixed
            # Setting the length in the database
            for i in range(len(cables)):
                num = cables[i]
                chosen_object = CableJournal.objects.filter(id=num)[0]
                chosen_object.length = round(float(random_stuff_bigger[i]), 1)
                chosen_object.save()

        return Response(request.data)


class IsolationSetView(APIView):
    serializer_class = CableJournalSerializer

    def post(self, request, *args, **kwargs):
        req_data = request.data
        cables = req_data['cables']
        low = req_data['low']
        high = req_data['high']
        final_list = []
        # If at least one number is float (find number of characters after the dot and if at least one is > 0)
        try:
            decimal_places_low = len(str(low).split(".")[1])
        except IndexError:
            decimal_places_low = 0
        try:
            decimal_places_high = len(str(high).split(".")[1])
        except IndexError:
            decimal_places_high = 0
        if decimal_places_high > 0 or decimal_places_low > 0:
            # Calculate which has more decimal places
            if decimal_places_low > decimal_places_high:
                decimate_places_rounding = decimal_places_low
            elif decimal_places_low < decimal_places_high:
                decimate_places_rounding = decimal_places_high
            else:
                decimate_places_rounding = decimal_places_low
            # Set numbers to float and randomize numbers
            low_float = float(req_data['low'])
            high_float = float(req_data['high'])
            for i in range(len(cables)):
                random_value = round(np.random.uniform(low_float, high_float), decimate_places_rounding)
                final_list.append(random_value)
        # If both numbers are int
        else:
            low_int = int(req_data['low'])
            high_int = int(req_data['high'])
            for i in range(len(cables)):
                random_value = np.random.randint(low_int, high_int+1)
                final_list.append(random_value)
        # Adding numbers to the database
        for i in range(len(cables)):
            num = cables[i]
            chosen_object = CableJournal.objects.filter(id=num)[0]
            chosen_object.isolation = final_list[i]
            chosen_object.save()
        return Response(request.data)


class IsolationExportView(APIView):
    serializer_class = CableJournalSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        object_id = self.kwargs['id']
        system_id = self.kwargs['system']
        cj = CableJournal.objects.filter(object=object_id, system=system_id).order_by('index')
        return cj

    def get(self, request, *args, **kwargs):
        cj = self.get_queryset()
        serializer = CableJournalSerializer(cj, many=True)
        export_array = []
        for i in serializer.data:
            dict_excel = json.loads(json.dumps(i))
            norm_text = 'норма'
            array_row = [dict_excel['name'], dict_excel['cable'],
                         dict_excel['cable_cut'], dict_excel['isolation'], norm_text]
            export_array.append(array_row)
        # Excel export
        output = io.BytesIO()
        workbook = xlsxwriter.Workbook(output)
        worksheet = workbook.add_worksheet()
        for row_num, columns in enumerate(export_array):
            for col_num, cell_data in enumerate(columns):
                worksheet.write(row_num, col_num, cell_data)
        workbook.close()
        output.seek(0)
        filename = 'django_simple.xlsx'
        response = HttpResponse(
            output,
            content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        )
        response['Content-Disposition'] = 'attachment; filename=%s' % filename
        return response


class CableJournalWordExportView(APIView):
    serializer_class = CableJournalSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        req_data = request.data
        file_path = os.path.join(MEDIA_ROOT, 'CJ_template_final.docx')
        template = DocxTemplate(file_path)
        template.render(req_data)
        doc_io = io.BytesIO()  # create a file-like object
        template.save(doc_io)  # save data to file-like object
        doc_io.seek(0)  # go to the beginning of the file-like object
        response = HttpResponse(doc_io.read())
        response["Content-Disposition"] = "attachment; filename=generated_doc.docx"
        response["Content-Type"] = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"

        return response


class IsolationWordExportView(APIView):
    serializer_class = CableJournalSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        req_data = request.data
        file_path = os.path.join(MEDIA_ROOT, 'Isolation_template.docx')
        template = DocxTemplate(file_path)
        template.render(req_data)
        doc_io = io.BytesIO()  # create a file-like object
        template.save(doc_io)  # save data to file-like object
        doc_io.seek(0)  # go to the beginning of the file-like object
        response = HttpResponse(doc_io.read())
        response["Content-Disposition"] = "attachment; filename=generated_doc.docx"
        response["Content-Type"] = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"

        return response
