export class PuestoModel {
  public idPuesto: number | undefined;
  public clave: string | undefined;
  public nombre: string | undefined;
  public descripcion: string | undefined;
  public fk_idDepartamento: number | undefined;
  public estatus: boolean | undefined;
  public deshabilitar: boolean | undefined;
  public createdAt: string | undefined;
  public updatedAt: string | undefined;

  constructor () { }
}