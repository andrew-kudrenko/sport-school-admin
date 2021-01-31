import React, { useEffect, useState } from "react";
import { Grid, TextField } from "@material-ui/core";
import { useFormHandlers } from "../../hooks/form-handlers.hooks";
import { IEntityEditorProps } from "../../interfaces/components.interfaces";
import { EditorFormLayout } from "../layouts/EditorFormLayout";
import { useIDParam } from "../../hooks/id-param.hook";
import { useFoundCities } from "../../hooks/found-by-city.hook";
import {
  useDeleteQuery,
  usePostQuery,
  usePutQuery,
} from "../../hooks/query.hook";
import { validate } from "../../helpers/truthy-validator.helper";

export const CitiesEditorLayout: React.FC<IEntityEditorProps> = ({
  mode,
  title,
}) => {
  const editing = mode === "edit";

  const id = useIDParam();
  let { cities, loading, execute: fetchCities } = useFoundCities();

  const [name, setName] = useState("");
  const [payments, setPayments] = useState("");

  const { onChange } = useFormHandlers();
  const onClearAll = setName.bind(null, "");

  const { execute: onAdd, loading: adding } = usePostQuery(
    "structures/cities",
    { name, payments }
  );
  const {
    execute: onModify,
    loading: modifying,
  } = usePutQuery(`structures/cities/${id}`, { name, payments });
  const { execute: onRemove, loading: removing } = useDeleteQuery(
    `structures/cities/${id}`
  );

  const isValid = validate([name]);

  useEffect(() => {
    const city = cities?.find((c) => String(c.id) === id);

    if (editing && city) {
      setName(city.name);
      setPayments(city.payments);
    }
  }, [cities]);

  return (
    <EditorFormLayout
      mode={mode}
      isValid={isValid}
      redirectTo="/cities/"
      title={title}
      loading={{
        read: loading,
        create: adding,
        update: modifying,
        delete: removing,
      }}
      onAdd={onAdd}
      onClearAll={onClearAll}
      onRemove={async () => {
        await onRemove();
        await fetchCities();
      }}
      onModify={onModify}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            label="Название"
            autoFocus
            value={name}
            onChange={onChange(setName)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            label="Токен"
            value={payments}
            onChange={onChange(setPayments)}
          />
        </Grid>
      </Grid>
    </EditorFormLayout>
  );
};
