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
        icon: 'cil-drop'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Mapa de Calor',
        to: '/theme/caso', 
        icon: 'cil-drop'
      },
     
     
      {
        _name: 'CSidebarNavItem',
        name: 'Usuarios',    
        to: '/theme/documentocarpeta',      
        icon: 'cil-pencil'
      },

      {
        _name: 'CSidebarNavItem',
        name: 'Noticias',    
        to: '/theme/documentocarpeta',      
        icon: 'cil-pencil'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Numeros de Ayuda',    
        to: '/theme/documentocarpeta',      
        icon: 'cil-pencil'
      },

      {
        _name: 'CSidebarNavItem',
        name: 'Alertas',    
        to: '/theme/documentocarpeta',      
        icon: 'cil-pencil'
      },

      {
        _name: 'CSidebarNavItem',
        name: 'Reportes',    
        to: '/theme/documentocarpeta',      
        icon: 'cil-pencil'
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