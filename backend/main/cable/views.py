from rest_framework import permissions, viewsets, generics, status
from .serializers import CableJournalSerializer
from .models import CableJournal
from rest_framework.filters import OrderingFilter
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import HttpResponse
import io
import xlsxwriter
import json


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

    def get_queryset(self):
        cj = CableJournal.objects.all()
        return cj

    def get(self, request, *args, **kwargs):
        cj = self.get_queryset()
        serializer = CableJournalSerializer(cj, many=True)

        return Response(serializer.data)

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
        cj = CableJournal.objects.filter(object=object_id, system=system_name)
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

