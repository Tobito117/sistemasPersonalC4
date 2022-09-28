export class HorarioEmpleadoModel {
  public idHorarioEmpleado: number | undefined;
  public fk_idEmpleado: number | undefined;
  public mes!: string;
  public anio!: string;
  public datosHorario: string | undefined;
  public estatus: boolean | undefined;
  public deshabilitar: boolean | undefined;
  public createdAt: string | undefined;
  public updatedAt: string | undefined;

  constructor () { }
}

export class HorarioEmpleadoTemporalModel {
  public anio!: string;
  public meses!: HorarioEmpleadoModel[];
}