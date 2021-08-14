from docx.shared import Cm, Inches, Mm, Emu
from docxtpl import DocxTemplate
import os

template = DocxTemplate('CJ_template.docx')
table_contents = []
for i in range(33):
    item_to_add = {
        'name': 'k.1',
        'start': 'Start 1',
        'end': 'End 1',
        'cable': 'Cable',
        'cable_cut': '1x2x1',
        'length': '100',
    }
    table_contents.append(item_to_add)
people = [
    {
        'p': 'engineer',
        'n': 'Vasiliev',
        'd': '22.01.2021'
    },
    {
        'p': 'gip',
        'n': 'Petrov',
        'd': '22.02.2021',
    }
]
context = {
    'system_code': 'cj-mgn-2021',
    'system_name': 'MGN',
    'table_contents': table_contents,
    'people': people,
}
template.render(context)
template.save('CJ.docx')
print(os.path.abspath('doc22.docx'))
