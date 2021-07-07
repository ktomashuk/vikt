from docx.shared import Cm, Inches, Mm, Emu
from docxtpl import DocxTemplate, InlineImage
import random
import datetime

template = DocxTemplate('Isolation_template.docx')
table_contents = []
x = []
y = []
for i in range(0, 12):
    number = round(random.random(), 3)
    table_contents.append({
        'Index': i,
        'Value': number
    })
    x.append(i)
    y.append(number)

context = {
    'city': 'Moscow',
    'object': 'School',
    'table_contents': table_contents,
}
template.render(context)
template.save('generated.docx')
