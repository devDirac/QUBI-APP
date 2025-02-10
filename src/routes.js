/**
=========================================================
* Otis Admin PRO - v2.0.1
=========================================================

* Product Page: https://material-ui.com/store/items/otis-admin-pro-material-dashboard-react/
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Otis Admin PRO React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that contains other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/
import WebhookIcon from '@mui/icons-material/Webhook';
import LockIcon from '@mui/icons-material/Lock';
import LineStyleIcon from '@mui/icons-material/LineStyle';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import SummarizeIcon from '@mui/icons-material/Summarize';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import CalculateIcon from '@mui/icons-material/Calculate';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import InventoryIcon from '@mui/icons-material/Inventory';
import WorkIcon from '@mui/icons-material/Work';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import UploadFileIcon from '@mui/icons-material/UploadFile';
/* sUB RUTAS */
import InsightsIcon from '@mui/icons-material/Insights';
import icon from 'assets/theme-dark/components/icon';

const routes = [
  {
    type: "collapse",
    key: "perfil",
    allow: [1, 2, 3, 4, 5],
    collapse: [
      {
        name: "Cerrar sesión",
        key: "logout",
        route: "/logoutPage",
        component: null,
        icon: <LockIcon />,
        allow: [1, 2, 3, 4, 5],
      },
      {
        name: "Perfil de usuario",
        key: "perfil-usuario",
        route: "/perfil-usuario",
        icon: 'LineStyleIcon',
        component: null,
        allow: [1, 2, 3, 4, 5],
      },
      {
        name: "Espacio de trabajo",
        key: "inicio",
        route: "/inicio",
        icon: 'LineStyleIcon',
        component: null,
        allow: [1, 2, 3, 4, 5],
      },
      {
        name: "Firma digital",
        key: "firma-digital",
        route: "/firma-digital",
        icon: 'LineStyleIcon',
        component: null,
        allow: [1, 2, 3, 4, 5],
      },
      {
        name: "Alertas",
        key: "alertas",
        icon: 'LineStyleIcon',
        route: "/alertas",
        component: null,
        allow: [1, 2, 3, 4, 5],
      },
    ],
  },
  { type: "divider", key: "divider-0", allow: [1, 2, 3, 4, 5] },
  {
    type: "collapse",
    name: "Super ADMIN",
    key: "super_admin",
    description: 'Módulo para disponible solo para el administrador',
    allow: [3],
    icon: <LockIcon />,
    iconText: 'Lock',
    collapse: [
      {

        name: "Usuarios",
        icon: 'GroupIcon',
        key: "Usuarios",
        allow: [3],
        collapse: [
          {
            name: "Alta de usuario",
            key: "usuario-alta",
            route: "/usuario-alta",
            component: null,
            allow: [3],
          },
          {
            name: "Gestión de usuarios",
            key: "usuarios-gestion",
            route: "/usuarios-gestion",
            component: null,
            allow: [3],
          },
          {
            name: "Permisos de usuario",
            key: "permisos-usuario",
            route: "/permisos-usuario",
            component: null,
            allow: [3],
          },
          {
            name: "Asignación de proyecto",
            key: "proyecto-alta",
            route: "/proyecto-alta",
            component: null,
            allow: [3],
          },
        ],
      },
      {
        name: "Repositorio de documentos",
        key: "repositorio-documentos-apm",
        icon: 'FolderIcon',
        route: "/repositorio-documentos-apm",
        component: null,
        allow: [3],
      },
      {
        icon: 'GroupAddIcon',
        name: "Alta masiva",
        key: "alta-masiva",
        route: "/alta-masiva",
        component: null,
        allow: [3],
      },
      {
        icon: 'PostAddIcon',
        name: "Catálogos",
        key: "catalogos",
        route: "/catalogos",
        component: null,
        allow: [3],
      },
      {
        icon: 'InsightsIcon',
        name: "Reportes dinamicos",
        key: "ReportesDinamicos",
        route: "/dinamic-dashboard",
        component: null,
        allow: [3],
      }
    ],
  },
  {
    type: "collapse",
    name: "Operaciones",
    description: '*',
    key: "Operaciones",
    allow: [1, 2, 3, 4, 5],
    esEspacio: true,
    escontratro: true,
    icon: <WebhookIcon />,
    collapse: [
      {
        icon: 'FormatListBulletedIcon',
        name: "Catálogo de conceptos por frentes",
        key: "catalogo-de-conceptos-por-frentes",
        route: "/catalogo-de-conceptos-por-frentes",
        component: null,
        allow: [1, 3, 2],
      },
      {
        icon: 'PlusOneIcon',
        name: "Realizar estimación",
        key: "realizar-estimacion",
        route: "/realizar-estimacion",
        component: null,
        allow: [1, 3, 5]
      }
    ]
  },

  { type: "divider", key: "divider-1", allow: [3] },
  {
    type: "collapse",
    name: "Matriz de avance",
    description: '*',
    key: "matriz-avance",
    allow: [1, 2, 3, 4, 5],
    esEspacio: true,
    escontratro: true,
    icon: <LineStyleIcon />,
    collapse: [
      {
        name: "Consulta de avances",
        icon: 'AddRoadIcon',
        key: "consulta-de-avances",
        route: "/consulta-de-avances",
        component: null,
        allow: [1, 2, 3, 4, 5]
      },
      {
        icon: 'WaterfallChartIcon',
        name: "Programa de contrato",
        key: "programa-contrato",
        route: "/programa-contrato",
        component: null,
        allow: [1, 2, 3, 4, 5]
      },
      {
        icon: 'WaterfallChartIcon',
        name: "Programa de obra",
        key: "programa-obra",
        route: "/programa-obra",
        component: null,
        allow: [1, 2, 3, 4, 5]
      },
      {
        icon: 'PaymentsIcon',
        name: "Programa financiero",
        key: "programa-financiero",
        route: "/programa-financiero",
        component: null,
        allow: [1, 3]
      },
      {
        icon: 'PaymentsIcon',
        name: "Programa financiero ajustado",
        key: "programa-financiero-ajustado",
        route: "/programa-financiero-ajustado",
        component: null,
        allow: [1, 3]
      },
      {
        icon: 'PaymentsIcon',
        name: "Programa financiero por clasificación",
        key: "programa-financiero-por-clasificacion",
        route: "/programa-financiero-por-clasificacion",
        component: null,
        allow: [1, 3]
      },
      {
        icon: 'CurrencyExchangeIcon',
        name: "Administrar programas financieros",
        key: "administrar-programas-financieros",
        route: "/administrar-programas-financieros",
        component: null,
        allow: [1, 3]
      },
      {
        icon: 'Filter9PlusIcon',
        name: "Avance conceptos",
        key: "matriz-avance-conceptos",
        route: "/matriz-avance-conceptos",
        component: null,
        allow: [1, 2, 3, 4, 5]
      }
    ],
  },

  {
    type: "collapse",
    name: "IA",
    description: '*',
    key: "ia",
    allow: [1, 2, 3, 4, 5],
    esEspacio: true,
    escontratro: true,
    icon: <InsightsIcon />,
    collapse: [
      {
        icon: 'RecordVoiceOverIcon',
        name: "Reporte voz/imagen",
        key: "reporte-voz-imagen",
        route: "/reporte-voz-imagen",
        component: null,
        allow: [1, 2, 3, 4, 5]
      },
      {
        icon: 'InsightsIcon',
        name: "Reportes dinamicos",
        key: "ReportesDinamicos",
        route: "/dinamic-dashboard",
        component: null,
        allow: [1, 2, 3, 4, 5],
      },
      {
        icon: 'ScreenSearchDesktopIcon',
        name: "Busqueda de documentos",
        key: "busquedaDocumentos",
        route: "/busqueda-documentos",
        component: null,
        allow: [1, 2, 3, 4, 5],
      }
    ]
  },

  {
    type: "collapse",
    name: "Reportes",
    description: '*',
    key: "reportes",
    allow: [1, 2, 3, 4, 5],
    esEspacio: true,
    escontratro: true,
    icon: <QueryStatsIcon />,
    collapse: [
      {
        icon: 'TipsAndUpdatesIcon',
        name: "Plan maestro",
        key: "plan-maestro",
        route: "/plan-maestro",
        component: null,
        allow: [1, 2, 3, 4, 5]
      },
      {
        icon: 'EventNoteIcon',
        name: "Calendario",
        key: "calendario",
        route: "/calendario",
        component: null,
        allow: [1, 2, 3, 4, 5]
      },
    ],
  },
  {
    type: "collapse",
    name: "Conceptos",
    description: '*',
    key: "conceptos",
    esEspacio: true,
    escontratro: true,
    allow: [1, 2, 3, 4, 5, 7],
    icon: <SummarizeIcon />,
    collapse: [
      {
        icon: 'FormatListBulletedIcon',
        name: "Catálogo de conceptos",
        key: "catalogo-conceptos",
        route: "/catalogo-conceptos",
        component: null,
        allow: [1, 2, 3, 4, 5]
      },
      {
        icon: 'ChecklistIcon',
        name: "Editar catálogo",
        key: "editar-catalogo",
        route: "/editar-catalogo",
        component: null,
        allow: [1, 3]
      },
      {
        icon: 'NoteAddIcon',
        name: "Cargar catálogo",
        key: "cargar-catalogo",
        route: "/cargar-catalogo",
        component: null,
        allow: [1, 3]
      },
      {
        icon: 'FormatListBulletedIcon',
        name: "Gestion de conceptos",
        key: "gestion-conceptos",
        route: "/gestion-conceptos",
        component: null,
        allow: [1, 3]
      },
      {
        icon: 'AddBoxIcon',
        name: "Agregar conceptos",
        key: "agregar-conceptos",
        route: "/agregar-conceptos",
        component: null,
        allow: [1, 3]
      },
      {
        icon: 'PersonPinIcon',
        name: "Asignar conceptos",
        key: "asignar-conceptos",
        route: "/asignar-conceptos",
        component: null,
        allow: [1, 3]
      },
      {
        icon: 'UploadFileIcon',
        name: "Alta documentos calidad",
        key: "alta-documentos-calidad",
        route: "/alta-documentos-calidad",
        component: null,
        allow: [7]
      },
      {
        icon: 'RuleFolderIcon',
        name: "Documentos calidad",
        key: "gestion-documentos-calidad",
        route: "/gestion-documentos-calidad",
        component: null,
        allow: [1, 3]
      }
    ],
  },
  {
    type: "collapse",
    name: "Expediente único",
    description: '*',
    key: "expediente-unico",
    allow: [1, 2, 3, 4, 5],
    esEspacio: true,
    escontratro: false,
    icon: <DocumentScannerIcon />,
    collapse: [
      {
        icon: 'FolderSharedIcon',
        name: "Archivos compartidos",
        key: "archivos-compartidos",
        route: "/archivos-compartidos",
        component: null,
        allow: [1, 2, 3, 4, 5],
        collapse: [
          {
            name: "el-finder",
            key: "el-finder",
            route: "/el-finder",
            component: null,
            allow: [1, 3]
          }
        ]
      },
    ],
  },
  {
    type: "collapse",
    name: "Carga documental",
    description: '*',
    key: "carga-documental",
    esEspacio: true,
    escontratro: true,
    allow: [3, 5],
    icon: <UploadFileIcon />,
    collapse: [
      {
        icon: 'PublishIcon',
        name: "Relizar carga documental",
        key: "realizar-carga-documental",
        route: "/realizar-carga-documental",
        component: null,
        allow: [3, 5]
      },
      {
        icon: 'DriveFolderUploadIcon',
        name: "Cargas realizadas",
        key: "cargas-realizadas",
        route: "/cargas-realizadas",
        component: null,
        allow: [3, 5]
      }
    ],
  },
  {
    type: "collapse",
    name: "Estimaciones",
    description: '*',
    key: "estimaciones",
    esEspacio: true,
    escontratro: true,
    allow: [1, 3, 5, 2, 4, 7],
    icon: <CalculateIcon />,
    collapse: [
      {
        icon: 'TocIcon',
        name: "Relación de estimaciones",
        key: "relacion-estimaciones",
        route: "/relacion-estimaciones",
        component: null,
        allow: [1, 3, 5, 2, 4, 7]
      },
      {
        icon: 'PlaylistAddCircleIcon',
        name: "Realizar estimación",
        key: "realizar-estimacion",
        route: "/realizar-estimacion",
        component: null,
        allow: [1, 3, 5]
      },
      {
        icon: 'ClearAllIcon',
        name: "Estimaciones por contratista",
        key: "estimaciones-por-contratista",
        route: "/estimaciones-por-contratista",
        component: null,
        allow: [1, 3]
      },
      {
        name: "Control de estimaciones",
        icon: 'ClearAllIcon',
        key: "control-estimaciones",
        route: "/control-estimaciones",
        component: null,
        allow: [1, 3]
      },
      {
        icon: 'HistoryIcon',
        name: "Histórico por concepto",
        key: "historico-estimaciones-concepto",
        route: "/historico-estimaciones-concepto",
        component: null,
        allow: [1, 3]
      },
      {
        icon: 'AutoAwesomeMotionIcon',
        name: "Deductivas",
        key: "Deductivas",
        allow: [1, 3],
        collapse: [
          {
            name: "Generar deductiva externa",
            key: "generar-deductiva-externa",
            route: "/generar-deductiva-externa",
            component: null,
            allow: [1, 3]
          },
          {
            name: "Consulta deductiva externa",
            key: "consulta-deductiva-externa",
            route: "/consulta-deductiva-externa",
            component: null,
            allow: [1, 3]
          },
        ],
      },
      {
        icon: 'ClearAllIcon',
        name: "Estimaciones contratista",
        key: "estimaciones-contratista",
        route: "/estimaciones-contratista",
        component: null,
        allow: [1, 3]
      },
      {
        icon: 'FolderZipIcon',
        name: "Generar paquete de estimaciones",
        key: "generar-paquete-estimaciones",
        route: "/generar-paquete-estimaciones",
        component: null,
        allow: [1, 3]
      },
    ],
  },
  {
    type: "collapse",
    name: "Parámetros del sistema",
    description: '*',
    key: "parametros-sistema",
    allow: [1, 3, 2],
    esEspacio: true,
    escontratro: false,
    icon: <DisplaySettingsIcon />,
    collapse: [
      {
        name: "Proyectos",
        icon: 'CategoryIcon',
        key: "parametros-sistema-proyectos",
        allow: [1, 3],
        collapse: [
          {
            name: "Alta de proyectos",
            key: "alta-obras",
            route: "/alta-obras",
            component: null,
            allow: [1, 3],
          },
          {
            name: "Gestión de proyectos",
            key: "gestion-obras",
            route: "/gestion-obras",
            component: null,

            allow: [1, 3],
          }
        ]
      },
      {
        name: "Contratos",
        key: "parametros-sistema-contratos",
        allow: [1, 3],
        icon: 'ClassIcon',
        collapse: [
          {
            name: "Alta de contratos",
            key: "alta-contratos",
            route: "/alta-contratos",
            component: null,
            allow: [1, 3],
          },
          {
            name: "Gestión de contratos",
            key: "gestion-contratos",
            route: "/gestion-contratos",
            component: null,
            allow: [1, 3],
          }
        ]
      },
      {
        name: "Clientes",
        key: "parametros-sistema-clientes",
        allow: [1, 3],
        icon: 'FaceRetouchingNaturalIcon',
        collapse: [
          {
            name: "Alta de cliente",
            key: "parametros-sistema-clientes",
            route: "/parametros-sistema-clientes",
            component: null,
            allow: [1, 3],
          },
          {
            name: "Gestión de clientes",
            key: "parametros-sistema-gestion-clientes",
            route: "/parametros-sistema-gestion-clientes",
            component: null,
            allow: [1, 3],
          }
        ]
      },
      {
        name: "Usuarios",
        key: "parametros-sistema-usuarios",
        allow: [1, 3],
        icon: 'GroupIcon',
        collapse: [
          {
            name: "Alta de usuario",
            key: "usuario-alta",
            route: "/usuario-alta",
            component: null,
            allow: [1, 3],
          },
          {
            name: "Gestión de usuarios",
            key: "usuarios-gestion",
            route: "/usuarios-gestion",
            component: null,
            allow: [1, 3],
          }
        ],
      },
      {
        name: "Contratistas",
        key: "parametros-sistema-contratistas",
        route: "/parametros-sistema-contratistas",
        component: null,
        icon: 'CorporateFareIcon',
        allow: [1, 3]
      },
      {
        name: "Frentes",
        key: "parametros-sistema-frentes",
        icon: 'DoorFrontIcon',
        allow: [1, 3, 2],
        collapse: [
          {
            name: "Alta masiva de frentes y conceptos",
            key: "alta-masiva-frentes-y-conceptos",
            route: "/alta-masiva-frentes-y-conceptos",
            component: null,
            allow: [1, 3],
          },
          {
            name: "Alta de frentes",
            key: "alta-frentes",
            route: "/alta-frentes",
            component: null,
            allow: [1, 3],
          },
          {
            name: "Catálogo de conceptos por frentes",
            key: "catalogo-de-conceptos-por-frentes",
            route: "/catalogo-de-conceptos-por-frentes",
            component: null,
            allow: [1, 3, 2],
          }
        ]
      },
      {
        name: "Clasificación contrato",
        key: "clasificacion-contrato",
        route: "/clasificacion-contrato",
        icon: 'ClassIcon',
        component: null,
        allow: [1, 3]
      },
      {
        name: "Catálogo de especialidades",
        key: "parametros-sistema-catalogo-especialidades",
        icon: 'InventoryIcon',
        route: "/parametros-sistema-catalogo-especialidades",
        component: null,
        allow: [1, 3]
      },
      {
        name: "Catálogo de documentos",
        key: "parametros-sistema-catalogo-documentos",
        icon: 'InventoryIcon',
        route: "/parametros-sistema-catalogo-documentos",
        component: null,
        allow: [1, 3]
      },
      {
        name: "Documentos cargados calidad",
        icon: 'TopicIcon',
        key: "documentos-cargados-calidad",
        route: "/documentos-cargados-calidad",
        component: null,
        allow: [1, 3]
      },
      {
        name: "Notificaciones",
        key: "notioficaciones",
        route: "/notificaciones",
        icon: 'NotificationsIcon',
        component: null,
        allow: [1, 3]
      },
    ],
  },
  {
    type: "collapse",
    name: "Cuentas contables",
    description: '*',
    key: "contables",
    allow: [1, 3],
    esEspacio: true,
    escontratro: true,
    icon: <MonetizationOnIcon />,
    collapse: [
      {
        name: "Administrar cuentas",
        key: "administrar-cuentas",
        icon: 'DnsIcon',
        route: "/administrar-cuentas",
        component: null,
        allow: [1, 3]
      },
      {
        name: "Ver cuentas",
        key: "ver-cuentas",
        icon: 'LineStyleIcon',
        route: "/ver-cuentas",
        component: null,
        allow: [1, 3]
      },
      {
        name: "Agregar cuenta",
        key: "agregar-cuenta",
        route: "/agregar-cuenta",
        icon: 'PlaylistAddIcon',
        component: null,
        allow: [1, 3]
      },
      {
        name: "Contratos",
        key: "contratos",
        route: "/contratos-cuentas-contables",
        icon: 'ClassIcon',
        component: null,
        allow: [1, 3]
      }
    ],
  },
  {
    type: "collapse",
    name: "Indicadores financieros y de productividad",
    description: '*',
    key: "Indicadores financieros y de productividad",
    allow: [1, 3],
    esEspacio: true,
    escontratro: false,
    icon: <AnalyticsIcon />,
    collapse: [
      {
        name: "Dashboard proyecto",
        key: "dashboard-apm-info",
        route: "/dashboard-apm-info",
        component: null,
        icon: 'DashboardIcon',
        allow: [1, 3]
      },
      {
        name: "CPO (Control presupuestal de obra)",
        key: "cpo",
        icon: 'ControlCameraIcon',
        route: "/cpo",
        component: null,
        allow: [1, 3]
      }
    ],
  },
  {
    type: "collapse",
    name: "Insumos",
    description: '*',
    key: "insumos",
    allow: [1, 3],
    esEspacio: true,
    escontratro: true,
    icon: <InventoryIcon />,
    collapse: [
      {
        name: "Catálogo",
        key: "catalogo",
        icon: 'FormatListBulletedIcon',
        route: "/catalogo-insumos",
        component: null,
        allow: [1, 3]
      }
    ],
  },
  {
    type: "collapse",
    name: "Sesión de trabajo",
    description: '*',
    key: "sesion-trabajo",
    allow: [1, 2, 3, 4, 5],
    esEspacio: true,
    escontratro: true,
    icon: <WorkIcon />,
    collapse: [
      {
        name: "Contratos",
        key: "sesion-trabajo-contratos",
        icon: 'LineStyleIcon',
        route: "/sesion-trabajo-contratos",
        component: null,
        allow: [1, 2, 3, 4, 5]
      },
      {
        name: "Plantilla conceptos / frentes",
        key: "plantilla-conceptos",
        icon: 'PaddingIcon',
        route: "/plantilla-conceptos",
        component: null,
        allow: [1, 2, 3, 4, 5]
      },
      {
        name: "Plantilla insumos",
        key: "plantilla-insumos",
        icon: 'PaddingIcon',
        route: "/plantilla-insumos",
        component: null,
        allow: [1, 2, 3, 4, 5]
      },
      {
        name: "Servicios de administrador",
        key: "servicios-administrador",
        icon: 'AdminPanelSettingsIcon',
        route: "/servicios-administrador",
        component: null,
        allow: [1, 3]
      }
    ],
  }
];

export default routes;
