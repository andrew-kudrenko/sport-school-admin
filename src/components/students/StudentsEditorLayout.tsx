import React, { useEffect, useState } from "react";
import {
  Chip,
  createStyles,
  Grid,
  Input,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { useFormHandlers } from "../../hooks/form-handlers.hooks";
import { IEntityEditorProps } from "../../interfaces/components.interfaces";
import { EditorFormLayout } from "../layouts/EditorFormLayout";
import { IDType, IStudent, IUser } from "../../interfaces/entities.interfaces";
import { useFoundGroups, useFoundUsers } from "../../hooks/found-by-city.hook";
import { validate } from "../../helpers/truthy-validator.helper";
import { Nullable } from "../../types/common.types";
import {
  useDeleteQuery,
  useGetQuery,
  usePostQuery,
  usePutQuery,
} from "../../hooks/query.hook";
import { useIDParam } from "../../hooks/id-param.hook";
import { collectCRUDLoading } from "../../helpers/crud-loading.helper";
import { splitDate } from "../../helpers/date-splitter.helper";
import { useFileUploading } from "../../hooks/file-uploading";
import { FileLoader } from "../file-loader/FileLoader";
import { API_URL } from "../../helpers/api.helper";
import { requestJSONAuth } from "../../helpers/request.hepler";

const useStyles = makeStyles(() =>
  createStyles({
    chips: {
      display: "flex",
      flexWrap: "wrap",
    },
    chip: {
      margin: 2,
    },
  })
);

export const StudentsEditorLayout: React.FC<IEntityEditorProps> = ({
  mode,
  title,
}) => {
  const classes = useStyles();
  const editing = mode === "edit";

  const id = useIDParam();
  const { users } = useFoundUsers();
  const { groups } = useFoundGroups();
  const { value: student, loading: fetching } = useGetQuery<
    { parent: Array<IUser> } & IStudent
  >(`persons/child/${id}`);

  const { preview, setPreview, locked, ...rest } = useFileUploading(
    `/persons/child/${id}/upload_photo/`
  );

  const [name, setName] = useState("");
  const [dob, setDOB] = useState<Date | null>(null);
  const [address, setAddress] = useState("");
  const [img, setImg] = useState<Nullable<string>>(null);
  const [group, setGroup] = useState<Nullable<IDType>>(null);
  const [parents, setParents] = useState<Array<IDType>>([]);
  const [basePrice, setBasePrice] = useState<Nullable<number>>(null);

  const [forSending, setForSending] = useState({
    item: {
      name,
      address,
      img: preview ? img : null,
      group_id: group,
      dob: dob ? splitDate(dob) : null,
      base_price: basePrice,
    },
    parent_ids: parents,
  });

  const {
    onChange,
    onSelect,
    onDateChange,
    onChangeMultiple,
  } = useFormHandlers();

  const onClearAll = () => {
    setName("");
    setPreview(null);
    setDOB(null);
    setAddress("");
    setGroup(null);
    setParents([]);
    setImg(null);
  };

  const { execute: onAdd, loading: adding } = usePostQuery(
    "persons/child",
    forSending
  );
  const { execute: onModify, loading: modifying } = usePutQuery(
    `persons/child/${id}`,
    forSending
  );
  const { execute: onRemove, loading: removing } = useDeleteQuery(
    `persons/child/${id}`
  );

  const loading = collectCRUDLoading([adding, fetching, modifying, removing]);
  const isValid = validate([name, address, parents, group, dob, !locked]);

  useEffect(() => {
    if (isValid) {
      setForSending({
        item: {
          name,
          address,
          img: preview ? img : null,
          group_id: group,
          dob: splitDate(dob),
          base_price: !Number.isNaN(Number.parseInt(String(basePrice)))
            ? basePrice
            : null,
        },
        parent_ids: parents,
      });
    }
  }, [name, dob, address, group, parents, student, img, preview, basePrice]);

  useEffect(() => {
    if (editing && student) {
      setName(student.name);
      setDOB(new Date(student.dob));
      setAddress(student.address);
      setGroup(student.group_id);
      setParents(student.parent.map((p) => String(p.tg_id)));
      setBasePrice(student.base_price);

      if (student.img) {
        setImg(student.img);
        setPreview(`${API_URL}/${student.img}`);
      }
    }
  }, [student]);

  const onEditParent = async () => {
    const foundParents = users.filter((u) => parents.includes(String(u.id)));
    for (const parent of foundParents) {
      await requestJSONAuth(`/tg/users/${parent.tg_id}`, "PUT", {
        ...parent,
        child_ids: [id],
      });
    }
  };

  return (
    <EditorFormLayout
      mode={mode}
      isValid={isValid}
      redirectTo="/students/"
      title={title}
      loading={loading}
      onClearAll={onClearAll}
      onAdd={async () => {
        await onEditParent();
        await onAdd();

        window.setTimeout(async () => {
          await rest.onUpload();
        }, 500);
      }}
      onModify={async () => {
        await onModify();

        window.setTimeout(async () => {
          await rest.onUpload();
        }, 500);
      }}
      onRemove={onRemove}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            label="Имя"
            autoFocus
            value={name}
            onChange={onChange(setName)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            label="Адрес"
            value={address}
            onChange={onChange(setAddress)}
          />
        </Grid>
        <Grid item xs={12}>
          {editing && (
            <Grid item xs={12}>
              <FileLoader preview={preview} {...rest} />
            </Grid>
          )}
        </Grid>
        <Grid item xs={12}>
          <Select
            variant="outlined"
            multiple
            fullWidth
            value={Array.from(new Set(parents.map(Number))) || ""}
            displayEmpty
            input={<Input />}
            onChange={onChangeMultiple(setParents)}
            renderValue={(selected) => {
              return (
                <div className={classes.chips}>
                  {(selected as string[]).length
                    ? (selected as string[])?.map((value) => (
                        <Chip
                          key={String(value)}
                          label={
                            users.find((u) => String(u.tg_id) === String(value))
                              ?.name || ""
                          }
                          className={classes.chip}
                        />
                      ))
                    : "Родители"}
                </div>
              );
            }}
          >
            {users
              .filter((u) => !u.is_child)
              .map((u) => (
                <MenuItem value={u.tg_id} key={u.tg_id}>
                  {u.name}
                </MenuItem>
              ))}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <Select
            variant="outlined"
            fullWidth
            value={group || ""}
            onChange={onSelect(setGroup)}
            displayEmpty
          >
            <MenuItem value="" disabled>
              {"Группа"}
            </MenuItem>
            {groups.map((c) => (
              <MenuItem value={c.id} key={c.id}>
                {c.year}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            label="Базовая стоимость"
            value={basePrice || ""}
            onChange={onChange(setBasePrice)}
          />
        </Grid>
        <Grid item xs={12}>
          <KeyboardDatePicker
            fullWidth
            margin="normal"
            label="Дата рождения"
            format="MM/dd/yyyy"
            value={dob}
            onChange={onDateChange(setDOB)}
          />
        </Grid>
      </Grid>
    </EditorFormLayout>
  );
};
