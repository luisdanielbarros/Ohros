import React from "react";
import { Button } from "react-bootstrap";
import { Field, ErrorMessage } from "formik";
//Truncate
export const Truncate = (string, limit) =>
  string === undefined
    ? ``
    : string.length > limit
    ? `${string.substr(0, limit)}...`
    : string;

//Submit Button
export const submitButton = (visibleText) => (
  <div className="form-group">
    <div className="form-attribute">
      <Button variant="light" type="submit">
        {visibleText}
      </Button>
    </div>
  </div>
);
//Load Form Attribute
export const loadFormAttribute = (
  attributeName,
  visibleText,
  placeHolder = "",
  Type = "text",
  extraInfo = ["bananas", "oranges"],
  onInput = null
) => {
  switch (Type) {
    case "text":
    case "password":
      return (
        <div className="form-attribute">
          <label htmlFor={`${attributeName}`}>{visibleText}</label>
          <Field
            as="input"
            name={`${attributeName}`}
            placeholder={`${placeHolder}`}
            type={`${Type}`}
          />
          <span>
            <ErrorMessage name={`${attributeName}`} />
          </span>
        </div>
      );
    case "select":
      return (
        <div className="form-attribute">
          <label htmlFor={`${attributeName}`}>{visibleText}</label>
          {onInput ? (
            <Field as="select" name={`${attributeName}`} onChange={onInput}>
              {extraInfo !== undefined && extraInfo.length ? (
                extraInfo.map((item) => (
                  <option key={item[0]} value={`${item[0]}`}>
                    {item[1]}
                  </option>
                ))
              ) : (
                <></>
              )}
            </Field>
          ) : (
            <Field as="select" name={`${attributeName}`}>
              {extraInfo !== undefined && extraInfo.length ? (
                extraInfo.map((item) => (
                  <option key={item[0]} value={`${item[0]}`}>
                    {item[1]}
                  </option>
                ))
              ) : (
                <></>
              )}
            </Field>
          )}

          <span>
            <ErrorMessage name={`${attributeName}`} />
          </span>
        </div>
      );
    case "textarea":
      return (
        <div className="form-attribute">
          <label htmlFor={`${attributeName}`}>{visibleText}</label>
          <Field
            as="textarea"
            name={`${attributeName}`}
            placeholder={`${placeHolder}`}
            type="text"
          />
          <span>
            <ErrorMessage name={`${attributeName}`} />
          </span>
        </div>
      );
    default:
      console.log(
        "Util.js, loadFormAttribute, unexpected value for variable Type."
      );
  }
};
//Remove FieldArray Attribute
export const removeFieldArrayAttribute = (remove, index) => (
  <div className="form-attribute">
    <label>&nbsp;</label>
    <Button variant="light" onClick={() => remove(index)}>
      -
    </Button>
  </div>
);
export const pushFieldArrayAttribute = (push) => (
  <div className="form-attribute">
    <Button variant="light" onClick={() => push("")}>
      +
    </Button>
  </div>
);
