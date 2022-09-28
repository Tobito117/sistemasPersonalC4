export class CatalogoHorarioModel {
  public idCatalogoHorario: number | undefined;
  public clave: string | undefined;
  public descripcion: string | undefined;
  public hora_entrada!: string;
  public hora_salida!: string;
  public cantidadRetardo: number | undefined;
  public hora_entrada2!: string;
  public hora_salida2!: string;
  public fk_idTipoHorario: string | number | undefined;
  public estatus: boolean | undefined;
  public color: string | undefined;
  public deshabilitar: boolean | undefined;
  public createdAt: string | undefined;
  public updatedAt: string | undefined;

  constructor () { }
}