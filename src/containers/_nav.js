export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Tablero',
        to: '/inicio/inicio',
        icon: 'cil-speedometer'
       
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Panel de Control']
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Mapa',
        to: '/inicio/mapa',
        icon: 'cilLocationPin'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Mapa de Calor',
        to: '/inicio/mapacalor', 
        icon: 'cilLocationPin'
      },
     
     
      {
        _name: 'CSidebarNavItem',
        name: 'Usuarios',    
        to: '/inicio/users',      
        icon: 'cilUser'
      },

      {
        _name: 'CSidebarNavItem',
        name: 'Noticias',    
        to: '/inicio/notices',      
        icon: 'cilSpreadsheet'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Numeros de Ayuda',    
        to: '/inicio/helpnumber',      
        icon: 'cilPhone'
      },

      {
        _name: 'CSidebarNavItem',
        name: 'Alertas',    
        to: '/inicio/alerts',      
        icon: 'cilWarning'
      },

      {
        _name: 'CSidebarNavItem',
        name: 'Reportes',    
        to: '/inicio/inicio',      
        icon: 'cil-chart'
      },

    ]
  }
]

// let tipoUsuario = window.localStorage.getItem("id_tipo");

// var modules = [{
//   _name: 'CSidebarNavItem',
//   name: 'Inicio',
//   to: '/inicio/inicio',
//   icon: 'cilHome',
// }];

// let me = this;
// let item = [];    
// let rutas={ 
//         _name: 'CSidebarNavItem',
//         name: 'Metodologia',
//         to: '/inicio/metodologia', 
//         icon: 'cil-drop'
// }

// modules.push(rutas);
// export default [
//   {
//     _name: 'CSidebarNav',
//     _children:modules
//   }
// ]