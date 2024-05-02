import flet as ft

def supportDataCellBuilder(compnay: str, line: str, support: int) -> ft.DataRow:
    if support == 1:
        s = "対応"
        c = ft.colors.GREEN
    elif support == 0:
        s = "一部対応"
        c = ft.colors.YELLOW
    elif support == -1:
        s = "非対応"
        c = ft.colors.RED
    else:
        s = "不明"
        c = ft.colors.BLUE
    return ft.DataRow(
        cells=[
            ft.DataCell(ft.Text(compnay)),
            ft.DataCell(ft.Text(line)),
            ft.DataCell(ft.Text(s,color=c))
        ]
    )

stationDataCellBuilder = lambda compnay,line,platform:ft.DataRow(cells=[ft.DataCell(ft.Text(compnay)),ft.DataCell(ft.Text(line)),ft.DataCell(ft.Text(f"{str(platform)}番線"))])
