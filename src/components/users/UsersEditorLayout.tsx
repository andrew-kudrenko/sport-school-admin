import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Select,
  MenuItem,
  createStyles,
  makeStyles,
  Chip,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import { EditorFormLayout } from "../layouts/EditorFormLayout";
import { useFormHandlers } from "../../hooks/form-handlers.hooks";
import { IEntityEditorProps } from "../../interfaces/components.interfaces";
import { IDType, IStudent, IUser } from "../../interfaces/entities.interfaces";
import {
  useFoundCities,
  useFoundSchools,
  useFoundStudents,
  useFoundUsers,
} from "../../hooks/found-by-city.hook";
import { collectCRUDLoading } from "../../helpers/crud-loading.helper";
import { useIDParam } from "../../hooks/id-param.hook";
import {
  useGetQuery,
  usePostQuery,
  usePutQuery,
  useDeleteQuery,
} from "../../hooks/query.hook";
import { Nullable } from "../../types/common.types";
import { validate } from "../../helpers/truthy-validator.helper";
import { CheckBoxOutlineBlank, CheckBoxOutlined } from "@material-ui/icons";

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

export const UsersEditorLayout: React.FC<IEntityEditorProps> = ({
  mode,
  title,
}) => {
  const classes = useStyles();
  const editing = mode === "edit";

  const id = useIDParam();
  const { onChange, onSelect, onChangeMultiple, onToggle } = useFormHandlers();

  const [login, setLogin] = useState("");
  const [name, setName] = useState("");

  const [isTrainer, setIsTrainer] = useState(false);
  const [isChild, setIsChild] = useState(false);
  const [isVerify, setIsVerify] = useState(false);
  const [isWasActivate, setWasActivate] = useState(false);

  const [city, setCity] = useState<Nullable<IDType>>(null);
  const [school, setSchool] = useState<Nullable<IDType>>(null);
  const [children, setChildren] = useState<Array<IDType>>([]);

  const [address, setAddress] = useState("");
  const [tel, setTel] = useState("");
  const [date, setDate] = useState<Nullable<Date>>(null);

  const { cities } = useFoundCities();
  const { schools } = useFoundSchools();

  const { value: user, loading: fetching } = useGetQuery<
    IUser & { childs: Array<IStudent> }
  >(`tg/users/${id}`);

  const { students, loading: studentsLoading } = useFoundStudents();

  const onClearAll = () => {
    setLogin("");
    setName("");

    setIsTrainer(false);
    setIsChild(false);
    setIsVerify(false);
    setWasActivate(false);

    setCity(null);
    setSchool(null);
    setChildren([]);

    setAddress("");
    setTel("");

    setDate(null);
  };

  const forSending = {
    item: {
      login,
      name,
      is_trainer: isTrainer,
      is_child: isChild,
      is_verify: isVerify,
      was_activate: isWasActivate,
      city_id: city,
      address,
      tel,
      date_joined: date?.toJSON(),
      school_id: school,
    },
    child_ids: children,
  };

  const { execute: onAdd, loading: adding } = usePostQuery(
    "tg/users",
    forSending
  );
  const { execute: onModify, loading: modifying } = usePutQuery(
    `tg/users/${id}`,
    forSending
  );
  const { execute: onRemove, loading: removing } = useDeleteQuery(
    `tg/users/${id}`
  );

  const isValid = validate([name, city, school]);
  const loading = collectCRUDLoading([adding, fetching, modifying, removing]);
  useEffect(() => {
    if (editing && user) {
      setLogin(user.login);
      setName(user.name);

      setIsTrainer(user.is_trainer);
      setIsChild(user.is_child);
      setIsVerify(user.is_verify);
      setWasActivate(user.was_activate);

      setCity(user.city_id);
      setSchool(user.school_id);

      setAddress(user.address);
      setTel(user.tel);
      setChildren(user?.childs?.map((c) => c.id) || []);

      setDate(new Date(user.date_joined));
    }
  }, [user]);

  useEffect(() => {
    const actual = students.filter((s) =>
      children.find((c) => String(c) === String(s.id))
    );

    if (children.length && !studentsLoading && !fetching && !actual.length) {
      setChildren(actual.map((a) => String(a.id)));
    }
  }, [user, students, studentsLoading, fetching]);

  return (
    <EditorFormLayout
      mode={mode}
      onAdd={onAdd}
      onModify={onModify}
      onRemove={onRemove}
      onClearAll={onClearAll}
      isValid={isValid}
      redirectTo="/users/"
      title={title}
      loading={loading}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            fullWidth
            label="Логин"
            autoFocus
            value={login}
            onChange={onChange(setLogin)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            fullWidth
            label="ФИО"
            value={name}
            onChange={onChange(setName)}
          />
        </Grid>
        <Grid item xs={12}>
          <Select
            variant="outlined"
            fullWidth
            multiple
            value={children || ""}
            onChange={onChangeMultiple(setChildren)}
            displayEmpty
            renderValue={(selected) => (
              <div className={classes.chips}>
                {(selected as string[])?.length
                  ? (selected as string[]).map((value) => {
                      return (
                        <Chip
                          key={value}
                          label={
                            students.find((u) => String(u.id) === String(value))
                              ?.name || ""
                          }
                          className={classes.chip}
                        />
                      );
                    })
                  : "Дети"}
              </div>
            )}
          >
            {students
              .filter((s) => String(s.id) !== String(id))
              .map((s) => (
                <MenuItem value={s.id || ""} key={s.id}>
                  {s.name}
                </MenuItem>
              ))}
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Select
            variant="outlined"
            fullWidth
            value={city || ""}
            onChange={onSelect(setCity)}
            displayEmpty
          >
            <MenuItem value="" disabled>
              {"Город"}
            </MenuItem>
            {cities.map((c) => (
              <MenuItem value={c.id} key={c.id}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Select
            variant="outlined"
            fullWidth
            value={school || ""}
            onChange={onSelect(setSchool)}
            displayEmpty
          >
            <MenuItem value="" disabled>
              {"Школа"}
            </MenuItem>
            {schools.map((s) => (
              <MenuItem value={s.id} key={s.id}>
                {s.name}
              </MenuItem>
            ))}
          </Select>
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
          <TextField
            variant="outlined"
            fullWidth
            label="Номер телефона"
            value={tel}
            onChange={onChange(setTel)}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Checkbox
                icon={<CheckBoxOutlineBlank fontSize="small" />}
                checkedIcon={<CheckBoxOutlined fontSize="small" />}
                checked={isVerify}
                onChange={onToggle(setIsVerify, isVerify)}
              />
            }
            label="Подтверждён"
          />
        </Grid>
        {/* <Grid item xs={6}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                icon={<CheckBoxOutlineBlank fontSize="small" />}
                                checkedIcon={<CheckBoxOutlined fontSize="small" />}
                                checked={isWasActivate}
                                onChange={onToggle(setWasActivate, isWasActivate)}
                            />
                        }
                        label="Активирован"
                    />
                </Grid> */}
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Checkbox
                icon={<CheckBoxOutlineBlank fontSize="small" />}
                checkedIcon={<CheckBoxOutlined fontSize="small" />}
                checked={isTrainer}
                onChange={onToggle(setIsTrainer, isTrainer)}
              />
            }
            label="Тренер"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Checkbox
                icon={<CheckBoxOutlineBlank fontSize="small" />}
                checkedIcon={<CheckBoxOutlined fontSize="small" />}
                checked={isChild}
                onChange={onToggle(setIsChild, isChild)}
              />
            }
            label="Ребенок"
          />
        </Grid>
      </Grid>
    </EditorFormLayout>
  );
};
