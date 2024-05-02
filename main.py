import flet as ft
import flet.canvas as cv

import util
import tdata

##############
### Define ###
##############

VERSION: str = "0.1(Alpha)"

UPDATE_INFO: str = """

## 新機能

(なし)

## 変更点

(なし)

"""

#####################
### DirectionCall ###
#####################

def direction_refresh():
    print("")

############
### Main ###
############

def main(page: ft.Page):
    # 各種設定
    page.title = "TORO高速道路ネットワークマップ"
    page.padding = 0

    # ページのサイズ変更イベント
    def page_resize(e):
        # メインのリサイズ
        if page.width >= 1200:
            container_mapmain.width = page.width * 0.7
            container_mapmain.height = page.height
        else:
            container_mapmain.width = page.width
            container_mapmain.height = page.height
        # サイドバーのリサイズ
        if page.width >= 1200:
            container_sidebar.width = page.width * 0.3
            container_sidebar.height = page.height
            container_sidebar_title.width = page.width * 0.3 - 30
            container_sidebar_about.width = page.width * 0.3 - 30
            container_sidebar_trafinfo.width = page.width * 0.3 - 30
            tabs_sidebar_datatab.width = page.width * 0.3
            container_sidebar_directions.width = page.width * 0.3
            searchbar_sidebar_directions_a.width = page.width * 0.3 - 130
            searchbar_sidebar_directions_b.width = page.width * 0.3 - 130
        else:
            container_sidebar.width = page.width
            container_sidebar.height = page.height
            container_sidebar_title.width = page.width - 30
            container_sidebar_about.width = page.width - 30
            container_sidebar_trafinfo.width = page.width - 30
            tabs_sidebar_datatab.width = page.width
            container_sidebar_directions.width = page.width - 30
            searchbar_sidebar_directions_a.width = page.width - 130
            searchbar_sidebar_directions_b.width = page.width - 130
        page.update()
    page.on_resize = page_resize

    # 更新情報のダイアログを閉じるイベント
    def alertdialog_updateinfo_close(e):
        alertdialog_updateinfo.open = False
        page.update()

    # 更新情報のダイアログ
    alertdialog_updateinfo = ft.AlertDialog(
        modal=True,
        title=ft.Text(f"更新情報 v{VERSION}"),
        content=ft.Column(
            [
                ft.Markdown(
                    UPDATE_INFO,
                    selectable=True,
                    extension_set=ft.MarkdownExtensionSet.GITHUB_WEB,
                    on_tap_link=lambda e: page.launch_url(e.data),
                )
            ],
            width=page.width / 2,
            height=page.height * 0.7,
        ),
        actions=[
            ft.TextButton(
                "閉じる",
                on_click=alertdialog_updateinfo_close,
            )
        ],
        actions_alignment=ft.MainAxisAlignment.END,
    )
    alertdialog_updateinfo.open = True

    # サイドバー

    ## タイトル
    text_sidebar_title = ft.Text(
        "ようこそ！",
        theme_style=ft.TextThemeStyle.HEADLINE_LARGE,
        selectable=True,
    )

    container_sidebar_title = ft.Container(
        text_sidebar_title,
        width=page.width * 0.3,
    )

    ## 概要
    text_sidebar_about = ft.Text(
        "このアプリは、TOROの交通の整理のために作られたスタンドアローンの路線地図アプリです。",
        theme_style=ft.TextThemeStyle.BODY_MEDIUM,
        selectable=True,
    )

    container_sidebar_about = ft.Container(
        text_sidebar_about,
        width=page.width * 0.3,
    )

    ## 基本情報
    text_sidebar_data_author = ft.Text(
        "(データなし)",
        selectable=True,
    )

    text_sidebar_data_location = ft.Text(
        "(データなし)",
        selectable=True,
    )

    container_sidebar_data = ft.Container(
        ft.Column(
        [
            ft.Row(
                    [
                        ft.Icon(
                            ft.icons.PERSON,
                            ft.colors.LIGHT_BLUE,
                        ),
                        text_sidebar_data_author,
                    ],
                ),
                ft.Row(
                    [
                        ft.Icon(
                            ft.icons.LOCATION_ON,
                            ft.colors.GREEN,
                        ),
                        text_sidebar_data_location,
                    ],
                )
            ]
        ),
        padding=15,
    )

    a = []
    for s in tdata.supports:
        a.append(util.supportDataCellBuilder(s[0], s[1], s[2]))

    ## 交通情報
    datatable_sidebar_trafinfo = ft.DataTable(
            columns=[
                ft.DataColumn(ft.Text("運営元")),
                ft.DataColumn(ft.Text("路線名")),
                ft.DataColumn(ft.Text("情報")),
            ],
            rows=a,
        )

    container_sidebar_trafinfo = ft.Container(
        datatable_sidebar_trafinfo,
        padding=15,
        width=page.width * 0.3,
    )

    ## 経路案内
    ## ポイントA
    tf_sidebar_a = ft.TextField(
        label="出発地点",
        hint_text="例: スポーン南駅、スポーン北IC 等",
    )
    searchbar_sidebar_directions_a = ft.Container(tf_sidebar_a,width=page.width * 0.3 - 30)
    ## ポイントB
    tf_sidebar_b = ft.TextField(
        label="目的地点",
        hint_text="例: スポーン南駅、スポーン北IC 等",
    )
    searchbar_sidebar_directions_b = ft.Container(tf_sidebar_b,width=page.width * 0.3 - 30)

    def rotate_from_to(e):
        ta = tf_sidebar_a.value
        tb = tf_sidebar_b.value
        tf_sidebar_a.value = tb
        tf_sidebar_b.value = ta
        page.update()

    ## コンテナ
    container_sidebar_directions = ft.Container(
        ft.Column(
            [
                ft.Row(
                    [
                        searchbar_sidebar_directions_a,
                        ft.IconButton(
                            icon=ft.icons.ROTATE_LEFT,
                            icon_color=ft.colors.GREY,
                            icon_size=40,
                            tooltip="出発地と目的地を入れ替える",
                            on_click=rotate_from_to,
                        ),
                    ],
                    width=page.width * 0.3
                ),
                ft.Row(
                    [
                        searchbar_sidebar_directions_b,
                        ft.IconButton(
                            icon=ft.icons.ADD_LOCATION_ROUNDED,
                            icon_color=ft.colors.BLUE,
                            icon_size=40,
                            tooltip="中間地点を追加(開発中)",
                            #on_click=,
                        ),
                    ],
                    width=page.width * 0.3
                ),
                ft.Dropdown(
                    value="pubtraf",
                    on_change=direction_refresh,
                    options=[
                        ft.dropdown.Option("pubtraf", "公共交通機関"),
                        ft.dropdown.Option("expwy", "高速道路"),
                    ],
                ),
            ]
        ),
        padding=15,
        width=page.width * 0.3,
    )

    ## タブ
    tabs_sidebar_datatab = ft.Container(
        ft.Tabs(
            [
                ft.Tab(
                    "基本情報",
                    container_sidebar_data,
                    icon=ft.icons.TABLE_ROWS_ROUNDED,
                ),
                ft.Tab(
                    "交通情報",
                    container_sidebar_trafinfo,
                    icon=ft.icons.TRAIN_ROUNDED,
                ),
                ft.Tab(
                    "ルート/乗換",
                    container_sidebar_directions,
                    icon=ft.icons.DIRECTIONS,
                ),
            ]
        ),
        width=page.width * 0.3,
    )

    container_sidebar = ft.Container(
        ft.Column(
            [
                container_sidebar_title,
                container_sidebar_about,
                tabs_sidebar_datatab,
            ],
            col={"xl": 3},
        ),
        padding=15,
        height=page.height,
        width=page.width * 0.3,
    )

    # メイン
    mcanvas = cv.Canvas()

    container_mapmain = ft.Container(
        mcanvas,
        col={"xl": 7},
        height=page.height,
        width=page.width * 0.7,
    )

    # コントロールをページに追加
    page.add(
        ft.ResponsiveRow(
            [
                container_sidebar,
                container_mapmain,
            ],
            columns=10,
            alignment=ft.MainAxisAlignment.SPACE_BETWEEN,
        ),

        alertdialog_updateinfo,
    )

    page_resize(None)

ft.app(
    main,
    assets_dir="assets",
)