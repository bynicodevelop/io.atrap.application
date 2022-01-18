import { Subject } from "rxjs";
import { filter } from "rxjs/operators";

export const AlertType = {
  Success: "Success",
  Error: "Error",
  Info: "Info",
  Warning: "Warning",
};

const alertSubject = new Subject();
const defaultType = "default-alert";

function onAlert() {
  return alertSubject;
}

function onSuccess(title, subStitle) {
  const alert = {
    type: AlertType.Success,
    title,
    subTitle: subStitle,
  };

  alertSubject.next(alert);
}

function onDefaultAlert(
  alert = {
    type: defaultType,
  }
) {
  alertSubject.next(alert);
}

function clear(
  alert = {
    type: defaultType,
  }
) {
  alertSubject.next(alert);
}

export const alertServices = { onAlert, onDefaultAlert, onSuccess, clear };
