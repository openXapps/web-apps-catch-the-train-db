export const countrySchema = {
  name: '',
  iso: '',
  enabled: true,
  modifiedBy: '',
  modifiedDate: new Date()
};

export const stateSchema = {
  countryId: '',
  name: '',
  enabled: true,
  modifiedBy: '',
  modifiedDate: new Date()
};

export const stationSchema = {
  stateId: '',
  name: '',
  enabled: true,
  modifiedBy: '',
  modifiedDate: new Date()
};

export const routeSchema = {
  countryId: '',
  name: '',
  enabled: true,
  modifiedBy: '',
  modifiedDate: new Date()
};

export const scheduleSchema = {
  routeId: '',
  cars: 8,
  time: '',
  enabled: true,
  modifiedBy: '',
  modifiedDate: new Date()
};