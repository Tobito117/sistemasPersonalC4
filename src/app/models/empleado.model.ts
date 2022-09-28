export class EmpleadoModel {
  public idEmpleado: number | undefined;
  public nombre: string | undefined;
  public apPaterno: string | undefined;
  public apMaterno: string | undefined;
  public uriImgHuella: string | undefined;
  public fk_idPuesto!: number;
  public fk_idCorporacion!: number;
  public fk_idRecursoPago!: number;
  public fk_idGradoAcademico!: number;
  public estadoCivil: string | undefined;
  public fk_idCarrera!: number;
  public fechaNacimiento!: string;
  public hijos: boolean | undefined;
  public tipoSangre: string | undefined;
  public cuip: string | undefined;
  public curp: string | undefined;
  public rfc: string | undefined;
  public genero: string | undefined;
  public certificadoVacunacion: boolean | undefined;
  public correo: string | undefined;
  public numTelefonico: string | undefined;
  public domicilioCompleto: string | undefined;
  public vacaciones: number | undefined;
  public estatus: boolean | undefined;
  public deshabilitar: boolean | undefined;
  public createdAt: string | undefined;
  public updatedAt: string | undefined;

  constructor () { }
}