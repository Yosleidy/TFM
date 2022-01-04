import React from 'react';




function MostrarLicitacion() {

  const licitaciones = [

    {
      numero: 1,
      name: 'prueba',
      nameEmpresa: 'prueba',
      titulacion: 'prueba',
      descripcion: 'prueba',
      root: 'prueba',
    }
  ]


  const mostarLicitacion = () => {
    return licitaciones.map(lic => (
      <tr>
        <td>{lic.name}</td>
        <td>{lic.numero}</td>
        <td>{lic.nameEmpresa}</td>
        <td>{lic.titulacion}</td>
        <td>{lic.descripcion}</td>
        <td>{lic.root}</td>
      </tr>


    ))
  }



  //onSubmit= async ({nombreLicitacion, nombreEmpresa, titulacion,descripcion,root}) => {

  //this.setState([...this.licitaciones,{ name:nombreLicitacion, nameEmpresa:nombreEmpresa, titulacion:titulacion, descripcion:descripcion, root:root}]);


  //}




  return (
    <div>

      <table className="table table-striped table-bordered" style={{width: '85%', marginLeft: '5%' }}>
        <thead>
          <tr>
            <th>Licitacion</th>
            <th>Organismo</th>
            <th>Titulación</th>
            <th>Fecha fin</th>
            <th>Descripción</th>
            <th>Root</th>
          </tr>
        </thead>
        <tbody>
          {mostarLicitacion()}
        </tbody>
      </table>

    </div>
  );
}


export default MostrarLicitacion;
