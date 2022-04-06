import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Categoria } from 'src/app/models/categoria';
import { ConfiguracionCotizacion } from 'src/app/models/configuracion-cotizacion';
import { ControlMetrosKilosProducto } from 'src/app/models/control-metros-kilos-producto';
import { DesarrolloEstructura } from 'src/app/models/desarrollo-estructura';
import { DetalleConfiguracionCotizacion } from 'src/app/models/detalle-configuracion-cotizacion';
import { ControlStock } from 'src/app/models/enums/control-stock';
import { TipoFuelle } from 'src/app/models/enums/tipo-fuelle';
import { TipoMedida } from 'src/app/models/enums/tipo-medida';
import { TipoSellado } from 'src/app/models/enums/tipo-sellado';
import { UnidadEnum } from 'src/app/models/enums/unidad';
import { Especialidad } from 'src/app/models/especialidad';
import { Linea } from 'src/app/models/linea';
import { ParametroEstadoGeneral } from 'src/app/models/parametro-estado-general';
import { Proceso } from 'src/app/models/proceso';
import { Producto } from 'src/app/models/producto';
import { Unidad } from 'src/app/models/unidad';
import { VentasService } from '../ventas.service';

@Component({
  selector: 'app-nueva-cotizacion',
  templateUrl: './nueva-cotizacion.component.html',
  styleUrls: ['./nueva-cotizacion.component.scss']
})
export class NuevaCotizacionComponent implements OnInit {

  sumaTotalGramaje:number = 0;
  sumaTotalPorcentaje:number = 0;
  sumaTotalKilosNormales:number = 0;
  sumaTotalKilosRefile:number = 0;
  sumaTotalKilosConRefile:number = 0;
  sumaTotalKilosRegulacion:number = 0;
  sumaTotalKilosMermaOperacional:number = 0;
  sumaTotalKilosEntrada:number = 0;
  porcentajeScrapRefile:number = 0;
  porcentajeScrapRegulacion:number = 0;
  procentajeScrapMermaOperacional:number = 0;
  procentajeScrapGeneralProy:number = 0;

  producto = {} as Producto;
  proceso:string = "NEW";

  especialidades: Especialidad[];
  selectedEspecialidad: Especialidad;

  lineas: Linea[];
  categorias: Categoria[];
  unidades: Unidad[];
  parametrosGenerals: ParametroEstadoGeneral[];
  configuracionCotizaciones: ConfiguracionCotizacion[];
  listDesarrolloEstructuraSelected:DesarrolloEstructura[];
  listDesarrolloEstructura:DesarrolloEstructura[];
  listControlMetrosKilosProducto: ControlMetrosKilosProducto[]=[];

  tipoMedidas = [
    {name: 'Milimetros', code: 'MM'},
    {name: 'Centimetros', code: 'CM'},
    {name: 'Pulgadas', code: 'PU'}
  ];

  formatosSustrato = [
    {name: 'LAMINA', code: 'LAMINA'},
    {name: 'MANGA', code: 'MANGA'}
  ];

  tipoMedidasEspesor = [
    {name: '--', code: '--'}
  ];

  tiposImpresion = [
    {name: 'Interna', code: 'I'},
    {name: 'Externa', code: 'E'}
  ];

  numerosCilindro = [
    {name: '350', code:'350'},
    {name: '370', code:'370'},
    {name: '380', code:'380'},
    {name: '400', code:'400'},
    {name: '420', code:'420'},
    {name: '450', code:'450'},
    {name: '460', code:'460'},
    {name: '470', code:'470'},
    {name: '480', code:'480'},
    {name: '500', code:'500'},
    {name: '520', code:'520'},
    {name: '540', code:'540'},
    {name: '550', code:'550'},
    {name: '560', code:'560'},
    {name: '570', code:'570'},
    {name: '580', code:'580'},
    {name: '600', code:'600'},
    {name: '620', code:'620'},
    {name: '630', code:'630'},
    {name: '640', code:'640'},
    {name: '660', code:'660'},
    {name: '680', code:'680'},
    {name: '720', code:'720'},
    {name: '750', code:'750'},
    {name: '800', code:'800'}
  ];

  

  constructor(private ventasService:VentasService, private messageService: MessageService) {
    this.producto.estado='A';
    this.producto.estadoValvula='N';
    this.producto.estadoZipper ='N';
    this.producto.ancho=0;
    this.producto.largo=0;
    this.producto.espesor=0;
    this.producto.espesorGramoMt2=0;
    this.producto.pesoCalculado=0;
    this.producto.ancho=0;
    this.producto.largo=0;
    this.producto.espesor=0;
    this.producto.espesorPulgada=0;
    this.producto.anchoPulgada=0;
    this.producto.largoPulgada=0;
    this.producto.anchoMilimetro=0;
    this.producto.largoMilimetro=0;	
    this.producto.tipoMedida="MM";
    this.producto.formaSustratoDesarrollo="LAMINA";
    this.producto.numeroBandas=1;
    this.producto.anchoBandaImpresion =0;
    this.producto.anchoImpresion =0;

    this.producto.numeroRepeticiones=1;
    this.producto.largoRepeticionImpresion =0;
    this.producto.frecuenciaImpresion =0;

    this.producto.pesoCalculado =0;
    this.producto.pesoCalculadoAdicional =0;
  }

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
        this.producto.unidad = this.unidades[0];
      },
      error: (error)=>{
        console.log(error);
      },
      complete:()=>{

      }
    });

    this.ventasService.getParametroGeneralForCotizacion().subscribe({
      next: (response)=>{
        this.parametrosGenerals = response;
        //this.producto.parametroEstadoGeneralCotizacion = this.parametrosGenerals[0];
      },
      error: (error)=>{
        console.log(error);
      },
      complete:()=>{

      }
    });

    
    this.crearCboTipoMedidaEspesor();
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
        this.producto.linea =this.lineas[0];
        this.producto.unidad = this.producto.linea.unidadDefault;
        this.changeLinea();
        this.crearCboTipoMedidaEspesor();
        this.changeEspesorProducto();
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
    
  }

  changeLinea():void{
    if(this.producto.linea==null){
      this.categorias = [];
      return;
    }
    this.ventasService.getCategoriaByLinea(this.producto.linea).subscribe({
      next: (response)=>{
        this.producto.unidad = this.producto.linea.unidadDefault;
        this.categorias = response;
        this.producto.categoria =this.categorias[0];
        this.crearCboTipoMedidaEspesor();
        
        //crearProducto();
        //productoSelected.setParametroEstadoGeneralTipoProductoCtz(null);
        //productoSelected.setConfiguracionCotizacion(null);
        //listConfiguracionCotizacionSelected.clear();
        //listDesarrolloEstructuraSelected.clear();
        this.changeEspesorProducto();
        if (this.proceso == "NEW") {
            this.seleccionarControlStock();
        }
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

  crearProducto() :void{
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

            if (this.producto.impresion=='S') {
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
        debugger;

        //CALCULAMOS EL PESO PROYECTADO POR EL CAMBIO DE PESO POR MILLAR
        if (this.producto.unidad.id == UnidadEnum.MILLAR) {
          if (this.producto.anchoDesarrollo == null) {
            this.producto.anchoDesarrollo = 0;
          }
          if (this.producto.largoDesarrollo == null) {
            this.producto.largoDesarrollo = 0;
          }
          let peso =  this.redondear(this.producto.anchoDesarrollo * this.producto.largoDesarrollo * this.producto.espesorGramoMt2  / 1000000, 2);
          this.producto.pesoCalculado = peso;
          this.producto.margenBalanzaKg =  this.redondear(this.producto.pesoCalculado * 0.075, 2);

            this.producto.millaresProyectadosPt = 0;
            if (this.producto.pesoCalculado != null && this.producto.pesoCalculado > 0) {
              this.producto.millaresProyectadosPt =  this.redondear(this.producto.kilosProyectadosPt / this.producto.pesoCalculado, 2);
            }

            //CALCULAMOS LOS METROS PROYECTADOS DEL PRODUCTO TERMINADO
            this.producto.metrosProyectadosPt = 0;
            if (this.producto.largoDesarrollo  != null && this.producto.largoDesarrollo  > 0) {
                this.producto.metrosProyectadosPt = this.producto.largoDesarrollo * this.producto.millaresProyectadosPt / this.producto.numeroBandas;
            } 
        } else {
          this.producto.pesoCalculado = 0;
          this.producto.margenBalanzaKg =  this.redondear(this.producto.pesoCalculado * 0.075, 2);
            this.producto.metrosProyectadosPt = 0;
            if (this.producto.espesorGramoMt2 != null && this.producto.espesorGramoMt2 > 0
                    && this.producto.anchoUtilDesarrollo != null
                    && this.producto.anchoUtilDesarrollo > 0) {
                this.producto.metrosProyectadosPt =  this.redondear(this.producto.kilosProyectadosPt  / this.producto.espesorGramoMt2 * this.producto.anchoUtilDesarrollo /1000000, 2);
            }
        }

        this.calcularGramajeEstructura();
        this.calcularControlMetrosKilosProducto();
    }

    calcularGramajeEstructura():void{
      let cont:number = 0;
      this.listDesarrolloEstructuraSelected.forEach(e=>{
        if (e.estadoFijo == "N") {
          cont += 1;
        }
      });
      let gramaje = this.obtenerDifGramajeEstadoFijo();

        if (gramaje > 0) {
            if (cont > 0) {
                let gramajeSobrante:number = this.redondear(gramaje / cont, 2);
                let i =0;
                this.listDesarrolloEstructuraSelected.forEach(e=>{
                  i += 1;
                  e.orden  = i ;
                  if (e.estadoFijo == 'N') {
                      e.gramaje = gramajeSobrante;
                      e.espesorMicras  = this.redondear(e.gramaje / e.categoria.densidad, 2);
                      e.porcentajeEstructura = 0;
                      if (this.producto.espesorGramoMt2 > 0) {
                          e.porcentajeEstructura = this.redondear((e.gramaje / this.producto.espesorGramoMt2) * 100.00, 2);
                      } 
                      e.espesorMilPul = this.redondear(e.espesorMicras / 25.4, 2);
                  } else {
                    e.porcentajeEstructura = 0;
                    if (this.producto.espesorGramoMt2 > 0) {
                          e.porcentajeEstructura  = this.redondear((e.gramaje / this.producto.espesorGramoMt2) * 100.00, 2);
                      }
                  }

                  e.cantidadKilosNormal = this.redondear((e.porcentajeEstructura * this.producto.kilosProyectadosPt) / 100, 2);
                  e.cantidadKilosRefile  = 0;
                  if (e.anchoMm > 0 && this.producto.anchoUtilDesarrollo > 0) {
                      e.cantidadKilosRefile = this.redondear((e.cantidadKilosNormal * (e.anchoMm / this.producto.anchoUtilDesarrollo)) - e.cantidadKilosNormal,2 );
                  } 
                  e.cantidadKilosConrefile = e.cantidadKilosRefile + e.cantidadKilosNormal;

                  e.cantidadMetrosPt = this.producto.metrosProyectadosPt;
                  e.cantidadMetrosRegulacionProceso = this.obtenerMetrosRegulacionControl(e.proceso);
                  e.cantidadMetrosMermaOperacional = this.obtenerMetrosMermaControl(e.proceso);
                  e.cantidadMetrosEntrada = e.cantidadMetrosPt + e.cantidadMetrosRegulacionProceso + e.cantidadMetrosMermaOperacional;

                  let anchoMmSalidaProceso = e.anchoMm;
                  let factorLaminaManga = 0;
                  if (this.producto.formaSustratoDesarrollo == "MANGA") {
                      factorLaminaManga = 2;
                  }

                  e.cantidadKilosRegulacion = e.cantidadMetrosRegulacionProceso * anchoMmSalidaProceso * e.gramaje * factorLaminaManga / 1000000;
                  e.cantidadKilosMermaOperacional = e.cantidadMetrosMermaOperacional * anchoMmSalidaProceso * e.gramaje * factorLaminaManga / 1000000;
                  e.cantidadKilosEntradaTotal = e.cantidadKilosConrefile + e.cantidadKilosRegulacion + e.cantidadKilosMermaOperacional;
                });
            } else {
              let i=0;
              this.listDesarrolloEstructuraSelected.forEach(e=>{
                i +=1;
                e.orden = 1;
                e.porcentajeEstructura = 0;
                if (this.producto.espesorGramoMt2 > 0) {
                    e.porcentajeEstructura = (e.gramaje / this.producto.espesorGramoMt2) * 100.00;
                } 

                e.cantidadKilosNormal = e.porcentajeEstructura * this.producto.kilosProyectadosPt / 100;
                e.cantidadKilosRefile =0;
                if (e.anchoMm > 0 && this.producto.anchoUtilDesarrollo > 0) {
                    e.cantidadKilosRefile  = (e.cantidadKilosNormal * e.anchoMm / this.producto.anchoUtilDesarrollo) - e.cantidadKilosNormal;
                } 
                e.cantidadKilosConrefile  = e.cantidadKilosRefile + e.cantidadKilosNormal;
                e.cantidadMetrosPt = this.producto.metrosProyectadosPt;
                e.cantidadMetrosRegulacionProceso = this.obtenerMetrosRegulacionControl(e.proceso);
                e.cantidadMetrosMermaOperacional = this.obtenerMetrosMermaControl(e.proceso);
                e.cantidadMetrosEntrada = e.cantidadMetrosPt + e.cantidadMetrosRegulacionProceso + e.cantidadMetrosMermaOperacional;

                let anchoMmSalidaProceso:number = e.anchoMm;

                let factorLaminaManga = 1;
                if (this.producto.formaSustratoDesarrollo == "MANGA") {
                    factorLaminaManga = 2;
                }

                e.cantidadKilosRegulacion = this.redondear(e.cantidadMetrosRegulacionProceso * anchoMmSalidaProceso * e.gramaje * factorLaminaManga / 1000000, 2);
                e.cantidadKilosMermaOperacional = this.redondear(e.cantidadMetrosMermaOperacional * anchoMmSalidaProceso * e.gramaje * factorLaminaManga / 1000000, 2);
                e.cantidadKilosEntradaTotal = e.cantidadKilosConrefile + e.cantidadKilosRegulacion + e.cantidadKilosMermaOperacional;
            
              });
            }
        } else {
          let i=0;
          this.listDesarrolloEstructuraSelected.forEach(e=>{
              i += 1;
              e.orden  = i;
              e.porcentajeEstructura = 0;
              if (this.producto.espesorGramoMt2 > 0) {
                  e.porcentajeEstructura = this.redondear((e.gramaje / this.producto.espesorGramoMt2) * 100.00, 2);
              } 

              e.cantidadKilosNormal = this.redondear(e.porcentajeEstructura * this.producto.kilosProyectadosPt / 100,2);

              e.cantidadKilosRefile = 0;
              if (e.anchoMm > 0 && this.producto.anchoUtilDesarrollo > 0) {
                  e.cantidadKilosRefile  = this.redondear((e.cantidadKilosNormal * e.anchoMm / this.producto.anchoUtilDesarrollo) - e.cantidadKilosNormal, 2);
              } 
              e.cantidadKilosConrefile = e.cantidadKilosRefile + e.cantidadKilosNormal;
              e.cantidadMetrosPt = this.producto.metrosProyectadosPt;
              e.cantidadMetrosRegulacionProceso = this.obtenerMetrosRegulacionControl(e.proceso);
              e.cantidadMetrosMermaOperacional = this.obtenerMetrosMermaControl(e.proceso);
              e.cantidadMetrosEntrada = e.cantidadMetrosPt + e.cantidadMetrosRegulacionProceso + e.cantidadMetrosMermaOperacional;

              let anchoMmSalidaProceso:number = e.anchoMm;

              let factorLaminaManga:number = 1;
              if (this.producto.formaSustratoDesarrollo == "MANGA") {
                  factorLaminaManga = 2;
              }

              e.cantidadKilosRegulacion = e.cantidadMetrosRegulacionProceso * anchoMmSalidaProceso * e.gramaje * factorLaminaManga / 1000000;
              e.cantidadKilosMermaOperacional = e.cantidadMetrosMermaOperacional * anchoMmSalidaProceso * e.gramaje * factorLaminaManga / 1000000;
              e.cantidadKilosEntradaTotal =e.cantidadKilosConrefile + e.cantidadKilosRegulacion + e.cantidadKilosMermaOperacional;
          
          });
        }
        this.calcularTotalesEstructura();
    }

    calcularControlMetrosKilosProducto():void{
    //TODO: hacer logica

    }

    redondear(num:number, decimals:number): number{
        return Math.round(num * 100) / 100;
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

  calcularAnchoPulg():void {
      this.producto.ancho = this.redondear(this.producto.anchoPulgada * 2.54, 2);
      this.producto.anchoMilimetro = this.redondear(this.producto.anchoPulgada * 25.4, 2);

      this.crearProducto();
      this.calcularPesoAdicional();
  }

    calcularAnchoCm():void {
        this.producto.anchoPulgada  = this.redondear(this.producto.ancho/2.54, 2);
        this.producto.anchoMilimetro = this.redondear(this.producto.ancho * 10,2);

        this.crearProducto();
        this.calcularPesoAdicional();
    }

    calcularAnchoMm() :void{
        this.producto.ancho = this.redondear(this.producto.anchoMilimetro / 10, 2);
        this.producto.anchoPulgada  = this.redondear(this.producto.ancho / 2.54, 2);

        this.crearProducto();
        this.calcularPesoAdicional();
    }

    calcularLargoPulg() :void{
        this.producto.largo  = this.redondear(this.producto.largoPulgada * 2.54, 2);
        this.producto.largoMilimetro = this.redondear(this.producto.largoPulgada * 25.4, 2);

        this.crearProducto();
    }

    calcularLargoCm():void {
        this.producto.largoPulgada = this.redondear(this.producto.largo / 2.54, 2);
        this.producto.largoMilimetro = this.redondear(this.producto.largo * 10, 2);

        this.crearProducto();
    }

    calcularLargoMm():void {
        this.producto.largo = this.redondear(this.producto.largoMilimetro / 10, 2);
        this.producto.largoPulgada  = this.redondear(this.producto.largo / 2.54, 2);

        this.crearProducto();
    }

    calcularAnchoAPulg2():void {
        this.producto.anchoPulgada  = this.redondear(this.producto.ancho / 2.54, 2);
        this.crearProducto();
    }

    calcularAnchoACm2():void {
        this.producto.ancho = this.redondear(this.producto.anchoPulgada  * 2.54, 2);
        this.crearProducto();
    }

    calcularLargoAPulg2():void {
        this.producto.largoPulgada  = this.redondear(this.producto.largo / 2.54, 2);
        this.crearProducto();
    }

    calcularLargoACm2():void {
        this.producto.largo = this.redondear(this.producto.largoPulgada * 2.54, 2);
        this.crearProducto();
    }

    calcularPesoAdicional():void {
      let pesoAdic = 0;
      if (this.producto.estadoZipper=="S") {
          if (this.producto.anchoMilimetro > 0) {
              pesoAdic =  this.redondear(this.producto.pesoZipperUnd * this.producto.anchoMilimetro / 1000.00, 2);
          }
      }

      if (this.producto.estadoValvula=="S") {
          pesoAdic =  this.redondear(pesoAdic + this.producto.pesoValvulaUnd, 2);
      }

      this.producto.pesoCalculadoAdicional = pesoAdic;
  }


  crearCboTipoMedidaEspesor():void {
        this.tipoMedidasEspesor = [
          {code: '-', name: '--'}
        ];
        this.producto.tipoMedidaEspesor = "-";

        if(this.producto==null || this.producto.linea==null){
          return;
        }
        if (this.producto.linea.estadoParametroPlastico == 'M') {
            this.tipoMedidasEspesor = [
                {code: 'm/p', name: 'Mils Pulg'},
                {code: 'mic', name: 'Micras'}
            ];  
            
            if (this.proceso != "UPD") {
                  this.producto.tipoMedidaEspesor=="m/p";
            }
        } else if (this.producto.linea.estadoParametroPlastico == 'L') {
              this.tipoMedidasEspesor = [
                  {code: 'gr/m2', name: 'gr/m2'}
              ];  
              
              this.producto.tipoMedidaEspesor = "gr/m2";
        } 
    }

    calcularAnchoFrecuenciaImpresion(flag:string):void {
      if (flag=="A") {
          this.producto.anchoImpresion = this.producto.anchoBandaImpresion * this.producto.numeroBandas;
      } else if (flag=="F") {
          this.producto.frecuenciaImpresion = this.producto.largoRepeticionImpresion * this.producto.numeroRepeticiones;
      }
     }

     changeValvula():void {
          if (this.producto.estadoValvula=="N") {
              this.producto.pesoValvulaUnd = 0;
          }

          this.calcularPesoAdicional();
      }

      changeZipper():void {
          if (this.producto.estadoZipper=="N") {
              this.producto.pesoZipperUnd  = 0;
          }

          this.calcularPesoAdicional();
      }

      changeImpresion() :void {
        this.producto.textoImpresion = "";
        this.producto.tipoImpresion = "I";
        this.producto.numeroCilindro = "350";
        this.producto.numeroColores = "1";
        this.crearProducto();
        this.mostrarConfiguracionCotizacion();
    }

    mostrarConfiguracionCotizacion():void {
      this.configuracionCotizaciones =[];
      if (this.producto.parametroEstadoGeneralCotizacion != null) {

        this.ventasService.getConfiguracionCotizacion(this.producto.parametroEstadoGeneralCotizacion, this.producto.impresion=="S"?"SI":"NO").subscribe({
          next: (response)=>{
            this.configuracionCotizaciones = response;
            this.crearEstructuraProducto();
        
          },
          error: (error)=>{
            console.log(error);
          },
          complete:()=>{
    
          }
        });

         }
      
    }


    crearEstructuraProducto():void{
      this.listDesarrolloEstructuraSelected = [];
      this.listDesarrolloEstructura = [];
      if (this.producto.espesorGramoMt2 <= 0) {
        this.messageService.add({severity:'error', summary: 'Error', 
            detail: 'Debe ingresar un Gramaje  mayor a 0 para la estructura a desarrollar'});
        this.producto.configuracionCotizacion = null;
        return;
      }
      if (this.producto.configuracionCotizacion != null) {
        this.ventasService.getDetalleConfiguracionCotizacion(this.producto.configuracionCotizacion).subscribe({
          next: (response)=>{
            let listDCC:DetalleConfiguracionCotizacion[] = response;
            let i : number = 0
            listDCC.forEach(detCC=>{
              let de = {} as DesarrolloEstructura;
              i += 1;
              de.orden = i;
              de.categoria = detCC.categoria;
              de.densidad = detCC.categoria.densidad;
              de.estado = "A";
              //de.usuario  =navegacionBean.getUserDb());
              de.anchoMm = 0;
              de.cantidadKilosNormal = 0;
              de.cantidadKilosRefile = 0;
              de.cantidadKilosConrefile = 0;
              de.cantidadMetrosPt = 0;
              de.cantidadMetrosRegulacionProceso = 0;
              de.cantidadMetrosMermaOperacional = 0;
              de.cantidadMetrosEntrada = 0;
              de.cantidadKilosRegulacion = 0;
              de.cantidadKilosMermaOperacional = 0;
              de.cantidadKilosEntradaTotal = 0;
              de.proceso = detCC.proceso;

              if (this.producto.anchoUtilDesarrollo != null) {
                  de.anchoMm  = this.producto.anchoUtilDesarrollo + detCC.anchoAdicionalRefile;
              }

              de.gramaje =0;
              if (detCC.categoria.requiereEspesor == "O") {
                  de.gramaje  = detCC.categoria.gramajeDefinido;
              } 

              de.estadoFijo = "S";
              de.espesorMicras = 0;
              de.espesorMilPul = 0;
              de.porcentajeEstructura = 0;
              if (detCC.categoria.codigo == "PB" && this.producto.parametroEstadoGeneralCotizacion.numeroCapas == 1) {
                  de.estadoFijo = "S";
                  de.gramaje = this.obtenerDifGramaje();
                  de.espesorMicras = this.redondear(de.gramaje / de.densidad, 2);
                  de.espesorMilPul = 0;
                  de.porcentajeEstructura = this.redondear((de.gramaje / this.producto.espesorGramoMt2) * 100, 2);
              } else if (detCC.categoria.codigo == "PB"  && this.producto.parametroEstadoGeneralCotizacion.numeroCapas > 1) {
                  de.estadoFijo = "N";
                  de.gramaje = this.obtenerDifGramaje();
                  de.espesorMicras = this.redondear(de.gramaje / de.densidad, 2);
                  de.espesorMilPul = 0;
                  de.porcentajeEstructura = this.redondear((de.gramaje/this.producto.espesorGramoMt2) * 100, 2);
              } 
              this.listDesarrolloEstructuraSelected.push(de);
            });
            this.calcularGramajeEstructura();
            this.listDesarrolloEstructuraSelected.forEach(e=>{
              if (e.densidad > 0) {
                this.listDesarrolloEstructura.push(e);
              }
            })
          
            this.calcularControlMetrosKilosProducto();

          },
          error: (error)=>{
            console.log(error);
          },
          complete:()=>{
    
          }
        });
          
          
      }
    }

    obtenerDifGramaje():number {
      let sum:number = 0;
      this.listDesarrolloEstructuraSelected.forEach(d=>{
        sum += d.gramaje;
      });
      
      return this.producto.espesorGramoMt2 - sum;
    }

    obtenerDifGramajeEstadoFijo():number {
      let sum:number = 0;
      this.listDesarrolloEstructuraSelected.forEach(d=>{
        if (d.estadoFijo == "S")
          sum += d.gramaje;
      });
      
      return this.producto.espesorGramoMt2 - sum;
    }

    obtenerMetrosRegulacionControl(proceso:Proceso ):number {
      let metrosRegulacion = 0;

      if (proceso != null) {
          this.listControlMetrosKilosProducto.forEach(e=>{
            if (e.detalleRutaProceso.proceso.id == proceso.id) {
              metrosRegulacion = metrosRegulacion + e.metrosRegulacionProceso + e.metrosRegulacionSiguienteProceso;
              //break;
            }
          });
      }

      return metrosRegulacion;
  }

   obtenerMetrosMermaControl(proceso:Proceso) {
    let metrosMerma = 0;

    if (proceso != null) {
        this.listControlMetrosKilosProducto.forEach(e=>{
          if (e.detalleRutaProceso.proceso.id == proceso.id) {
            metrosMerma = metrosMerma + e.metrosMermaOperacional + e.metrosMermaOperacionalSigProc;
            //break;
          }
        });

    }

    return metrosMerma;
  }

    calcularTotalesEstructura():void {
      this.sumaTotalGramaje = 0;
      this.sumaTotalPorcentaje = 0;
      this.sumaTotalKilosNormales = 0;
      this.sumaTotalKilosRefile = 0;
      this.sumaTotalKilosConRefile = 0;
      this.sumaTotalKilosRegulacion = 0;
      this.sumaTotalKilosMermaOperacional = 0;
      this.sumaTotalKilosEntrada = 0;
      this.porcentajeScrapRefile = 0;
      this.porcentajeScrapRegulacion = 0;
      this.procentajeScrapMermaOperacional = 0;
      this.procentajeScrapGeneralProy = 0;

      this.listDesarrolloEstructuraSelected.forEach(e=>{
        this.sumaTotalGramaje = this.sumaTotalGramaje + e.gramaje;
        this.sumaTotalPorcentaje = this.sumaTotalPorcentaje + e.porcentajeEstructura;
        this.sumaTotalKilosNormales = this.sumaTotalKilosNormales  + e.cantidadKilosNormal;
        this.sumaTotalKilosRefile = this.sumaTotalKilosRefile + e.cantidadKilosRefile;
        this.sumaTotalKilosConRefile = this.sumaTotalKilosConRefile + e.cantidadKilosConrefile;

        this.sumaTotalKilosRegulacion = this.sumaTotalKilosRegulacion + e.cantidadKilosRegulacion;
        this.sumaTotalKilosMermaOperacional = this.sumaTotalKilosMermaOperacional + e.cantidadKilosMermaOperacional;
        this.sumaTotalKilosEntrada = this.sumaTotalKilosEntrada + e.cantidadKilosEntradaTotal;
      });
      
      //sumaTotalPorcentaje.setScale(0, RoundingMode.HALF_UP);

      if (this.sumaTotalKilosEntrada > 0) {
          this.porcentajeScrapRefile = this.redondear((this.sumaTotalKilosRefile / this.sumaTotalKilosEntrada) * 100, 2);
          this.porcentajeScrapRegulacion = this.redondear((this.sumaTotalKilosRegulacion / this.sumaTotalKilosEntrada) * 100, 2);
          this.procentajeScrapMermaOperacional = this.redondear((this.sumaTotalKilosMermaOperacional / this.sumaTotalKilosEntrada) * 100, 2);
          this.procentajeScrapGeneralProy = this.redondear(((this.sumaTotalKilosEntrada - this.sumaTotalKilosNormales)/this.sumaTotalKilosEntrada) * 100,2 );
      }
  }
}
