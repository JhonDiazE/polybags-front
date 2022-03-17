import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria';
import { ControlStock } from 'src/app/models/enums/control-stock';
import { TipoFuelle } from 'src/app/models/enums/tipo-fuelle';
import { TipoMedida } from 'src/app/models/enums/tipo-medida';
import { TipoSellado } from 'src/app/models/enums/tipo-sellado';
import { UnidadEnum } from 'src/app/models/enums/unidad';
import { Especialidad } from 'src/app/models/especialidad';
import { Linea } from 'src/app/models/linea';
import { Producto } from 'src/app/models/producto';
import { Unidad } from 'src/app/models/unidad';
import { VentasService } from '../ventas.service';

@Component({
  selector: 'app-nueva-cotizacion',
  templateUrl: './nueva-cotizacion.component.html',
  styleUrls: ['./nueva-cotizacion.component.scss']
})
export class NuevaCotizacionComponent implements OnInit {

  producto = {} as Producto;
  proceso:string = "NEW";

  especialidades: Especialidad[];
  selectedEspecialidad: Especialidad;

  lineas: Linea[];
  //selectedLinea: Linea;

  categorias: Categoria[];
  //selectedCategoria: Categoria;

  unidades: Unidad[];
  //selectedUnidad: Unidad;

  tipoMedidas = [
    {name: 'Milimetros', code: 'MM'},
    {name: 'Centimetros', code: 'CM'},
    {name: 'Pulgadas', code: 'PU'}
  ];

  tipoMedidasEspesor = [
    {name: '--', code: '--'}
  ];

  impresion:boolean=false;

  constructor(private ventasService:VentasService) { }

  ngOnInit(): void {
    this.ventasService.getEspecialidadForCotizacion().subscribe({
      next: (response)=>{
        this.especialidades = response;
      },
      error: (error)=>{
        console.log(error);
      },
      complete:()=>{

      }
    });
  
    this.ventasService.getUnidad().subscribe({
      next: (response)=>{
        this.unidades = response;
      },
      error: (error)=>{
        console.log(error);
      },
      complete:()=>{

      }
    });
  
  }

  seleccionarEspecialidad(event):void{
    if(this.proceso=="NEW"){
      this.producto.estadoProductoVenta = "-";
      if (this.selectedEspecialidad.estadoCamposPt== 'S') {
          this.producto.estadoProductoVenta = "S";
      } 
    }
    this.changeEspecialidad();
    //this.crearProducto();
    //this.producto.parametroEstadoGeneralTipoProductoCtz(null);
    //this.productoSelected.setConfiguracionCotizacion(null);
    //this.listConfiguracionCotizacionSelected.clear();
    //this.listDesarrolloEstructuraSelected.clear();
    this.changeEspesorProducto();
  }

 
  changeEspecialidad():void{
    if(this.selectedEspecialidad==null){
      this.lineas = [];
      this.categorias = [];
      return;
    }
    this.ventasService.getLineaByEspecialidad(this.selectedEspecialidad).subscribe({
      next: (response)=>{
        this.lineas = response;
      },
      error: (error)=>{
        console.log(error);
      },
      complete:()=>{

      }
    });
  }

  seleccionarLinea(event):void{
    this.changeLinea();
    //crearProducto();
    //productoSelected.setParametroEstadoGeneralTipoProductoCtz(null);
    //productoSelected.setConfiguracionCotizacion(null);
    //listConfiguracionCotizacionSelected.clear();
    //listDesarrolloEstructuraSelected.clear();
    this.changeEspesorProducto();
    if (this.proceso == "NEW") {
        this.seleccionarControlStock();
    }
  }

  changeLinea():void{
    if(this.producto.linea==null){
      this.categorias = [];
      return;
    }
    this.ventasService.getCategoriaByLinea(this.producto.linea).subscribe({
      next: (response)=>{
        this.categorias = response;
      },
      error: (error)=>{
        console.log(error);
      },
      complete:()=>{

      }
    });
  }

  seleccionarCategoria(event):void{
    //productoSelected.setParametroEstadoGeneralTipoProductoCtz(null);
    //productoSelected.setConfiguracionCotizacion(null);
    //listConfiguracionCotizacionSelected.clear();
    //listDesarrolloEstructuraSelected.clear();
    this.changeEspesorProducto();
  }

      crearProducto() {
        debugger;
        let descripcion = "";
        //if (proceso.equals("NEW")) {
            
            if (this.producto.linea != null) {
                descripcion = this.producto.linea.descripcion + " ";
            }

            if (this.producto.categoria != null) {
                descripcion += this.producto.categoria.descripcion + " ";
            }

            if (this.producto.color != null) {
                descripcion += this.producto.color.descripcion.toUpperCase() + " ";
            }

            if (this.producto.tipoMedida == TipoMedida.CENTIMETRO) {
                if (this.producto.ancho > 0) {
                    descripcion += this.producto.ancho + TipoMedida.CENTIMETRO_ABREVIATURA;
                }
                if (this.producto.largo > 0) {
                    descripcion += " X " + this.producto.largo  + TipoMedida.CENTIMETRO_ABREVIATURA;
                }
                if (this.producto.espesor > 0) {
                    descripcion += " X " + this.producto.espesor + this.producto.tipoMedidaEspesor;
                }

            } else if (this.producto.tipoMedida == TipoMedida.PULGADA) {
                if (this.producto.anchoPulgada > 0) {
                    descripcion += this.producto.anchoPulgada + TipoMedida.PULGADA_ABREVIATURA;
                }
                if (this.producto.largoPulgada > 0) {
                    descripcion += " X " + this.producto.largoPulgada + TipoMedida.PULGADA_ABREVIATURA;
                }
                if (this.producto.espesor > 0) {
                    descripcion += " X " + this.producto.espesor + this.producto.tipoMedidaEspesor;
                }
            } else {
                if (this.producto.anchoMilimetro > 0) {
                    descripcion += this.producto.anchoMilimetro + TipoMedida.MILIMETRO_ABREVIATURA;
                }
                if (this.producto.largoMilimetro > 0) {
                    descripcion += " X " + this.producto.largoMilimetro + TipoMedida.MILIMETRO_ABREVIATURA;
                }
                if (this.producto.espesor > 0) {
                    descripcion += " X " + this.producto.espesor + this.producto.tipoMedidaEspesor;
                }
            }

            if (this.impresion) {
                descripcion += " C/IMPR. " + this.producto.textoImpresion;
            }

            switch (this.producto.sellado) {
              case TipoSellado.SELLO_LATERAL:
                  descripcion += " C/SL";
                  break;
              case TipoSellado.SELLO_FONDO:
                  descripcion += " C/SF";
                  break;
              case TipoSellado.SELLO_LATERAL_REFORZADO:
                descripcion += " C/SLR";
                break;
              case TipoSellado.DOBLE_SELLO_FONDO:
                descripcion += " C/DSF";
                break;  
              case TipoSellado.SELLO_T:
                descripcion += " C/ST";
                break;  
              case TipoSellado.SELLO_U:
                descripcion += " C/SU";
                break;  
              case TipoSellado.SELLO_DOY_PACK:
                descripcion += " C/SDP";
                break;  
              default:
                  break;
            }
            
            switch (this.producto.fuelle) {
              case TipoFuelle.LATERAL:
                descripcion += " C/FL";
                break;  
              case TipoFuelle.FONDO:
                descripcion += " C/FF";
                break;
            }
            
            if (this.producto.adicional!=null && this.producto.adicional.trim() != "") {
                descripcion += " " + this.producto.adicional;
            }
            this.producto.descripcion = descripcion;
            this.producto.descripcionComercial  = this.producto.descripcion;
        //}
      }




      changeEspesorProducto():void {
        if (this.producto.tipoMedidaEspesor ==  TipoMedida.GRAMO_POR_METRO2) {
            this.producto.espesorGramoMt2 = this.producto.espesor;
        } else if (this.producto.tipoMedidaEspesor ==  TipoMedida.MICRA) {
            this.producto.espesorGramoMt2 = this.producto.categoria.densidad * this.producto.espesor;
        } else if (this.producto.tipoMedidaEspesor == TipoMedida.MILESIMA_PULGADA) {
            let espesormic = this.producto.espesor * 25.4;
            this.producto.espesorGramoMt2  = this.producto.categoria.densidad * espesormic;
        }
        this.crearProducto();
        this.calcularPeso();
    }

    calcularPeso():void {
        this.producto.pesoCalculado =0;
        this.producto.margenBalanzaKg = 0;

        //CALCULAMOS EL PESO PROYECTADO POR EL CAMBIO DE PESO POR MILLAR
        if (this.producto.unidad.id == UnidadEnum.MILLAR) {
          if (this.producto.anchoDesarrollo == null) {
            this.producto.anchoDesarrollo = 0;
          }
          if (this.producto.largoDesarrollo == null) {
            this.producto.largoDesarrollo = 0;
          }
          let peso = this.producto.anchoDesarrollo * this.producto.largoDesarrollo * this.producto.espesorGramoMt2  / 1000000;
          this.producto.pesoCalculado = peso;
          this.producto.margenBalanzaKg = this.producto.pesoCalculado * 0.075;

            this.producto.millaresProyectadosPt = 0;
            if (this.producto.pesoCalculado != null && this.producto.pesoCalculado > 0) {
              this.producto.millaresProyectadosPt = this.producto.kilosProyectadosPt / this.producto.pesoCalculado;
            }

            //CALCULAMOS LOS METROS PROYECTADOS DEL PRODUCTO TERMINADO
            this.producto.metrosProyectadosPt = 0;
            if (this.producto.largoDesarrollo  != null && this.producto.largoDesarrollo  > 0) {
                this.producto.metrosProyectadosPt = this.producto.largoDesarrollo * this.producto.millaresProyectadosPt / this.producto.numeroBandas;
            } 
        } else {
            this.producto.metrosProyectadosPt = 0;
            if (this.producto.espesorGramoMt2 != null && this.producto.espesorGramoMt2 > 0
                    && this.producto.anchoUtilDesarrollo != null
                    && this.producto.anchoUtilDesarrollo > 0) {
                this.producto.metrosProyectadosPt = this.producto.kilosProyectadosPt  / this.producto.espesorGramoMt2 * this.producto.anchoUtilDesarrollo /1000000;
            }
        }

        this.calcularGramajeEstructura();
        this.calcularControlMetrosKilosProducto();
    }

    calcularGramajeEstructura():void{
      //TODO: hacer logica
    }

    calcularControlMetrosKilosProducto():void{
    //TODO: hacer logica

    }


    seleccionarControlStock():void {
      if (this.producto.linea.estadoStockLote == 'S') {
          this.producto.tipoControlStock = ControlStock.LOTE;
      }

      if (this.producto.linea.estadoStockItem == 'S') {
          this.producto.tipoControlStock = ControlStock.ITEM;
      }

      this.producto.estadoProductoVenta = 'N';
      if (this.producto.linea.productoVenta) {
          this.producto.estadoProductoVenta = 'S';
      } 
      this.producto.tipoProductoVenta = this.producto.linea.tipoProductoVenta;
  }
}
