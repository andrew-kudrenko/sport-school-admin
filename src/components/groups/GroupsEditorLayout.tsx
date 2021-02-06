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
import { useFormHandlers } from "../../hooks/form-handlers.hooks";
import { IEntityEditorProps } from "../../interfaces/components.interfaces";
import { EditorFormLayout } from "../layouts/EditorFormLayout";
import { ICoach, IDType, IGroup } from "../../interfaces/entities.interfaces";
import {
  useFoundCoaches,
  useFoundSchools,
} from "../../hooks/found-by-city.hook";
import { Nullable } from "../../types/common.types";
import { validate } from "../../helpers/truthy-validator.helper";
import { useIDParam } from "../../hooks/id-param.hook";
import {
  useGetQuery,
  usePostQuery,
  usePutQuery,
  useDeleteQuery,
} from "../../hooks/query.hook";
import { collectCRUDLoading } from "../../helpers/crud-loading.helper";
import { FileLoader } from "../file-loader/FileLoader";
import { useFileUploading } from "../../hooks/file-uploading";
import { API_URL } from "../../helpers/api.helper";

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

export const GroupsEditorLayout: React.FC<IEntityEditorProps> = ({
  mode,
  title,
}) => {
  const classes = useStyles();
  const editing = mode === "edit";

  const id = useIDParam();

  const {
    preview: schedule,
    setPreview: setSchedule,
    locked,
    ...rest
  } = useFileUploading(`/persons/groups/${id}/upload_schedule/`);
  const { value: group, loading: fetching } = useGetQuery<
    IGroup & { trainers: Array<ICoach> }
  >(`persons/groups/${id}`);

  const { schools } = useFoundSchools();
  const { coaches } = useFoundCoaches();

  const [school, setSchool] = useState<Nullable<IDType>>(null);
  const [year, setYear] = useState<string>("");
  const [tgUrl, setTgUrl] = useState("");
  const [coachesID, setCoachesID] = useState<Array<IDType>>([]);
  const [img, setImg] = useState<Nullable<string>>(null);

  const [forSending, setForSending] = useState({
    item: {
      year,
      schedule: schedule ? img : null,
      tg_url: tgUrl,
      school_id: school,
    },
    trainer_ids: coachesID,
  });

  const { onChange, onSelect, onChangeMultiple } = useFormHandlers();

  const onClearAll = () => {
    setSchool(null);
    setYear("");
    setImg(null);
    setSchedule(null);
    setTgUrl("");
    setCoachesID([]);
  };

  const { execute: onAdd, loading: adding } = usePostQuery(
    "persons/groups",
    forSending
  );
  const { execute: onModify, loading: modifying } = usePutQuery(
    `persons/groups/${id}`,
    forSending
  );
  const { execute: onRemove, loading: removing } = useDeleteQuery(
    `persons/groups/${id}`
  );

  const isValid = validate([year, !locked, school]);

  const loading = collectCRUDLoading([adding, fetching, modifying, removing]);

  useEffect(() => {
    if (isValid) {
      setForSending({
        item: {
          year,
          schedule: schedule ? img : null,
          tg_url: tgUrl,
          school_id: school,
        },
        trainer_ids: coachesID,
      });
    }
  }, [year, tgUrl, school, coachesID, img, isValid, schedule]);

  useEffect(() => {
    if (editing && group) {
      setYear(String(group.year));
      setSchool(group.school_id);
      setTgUrl(group.tg_url);
      setCoachesID(group.trainers.map((t) => t.id));

      if (group.schedule) {
        setSchedule(`${API_URL}/${group.schedule}`);
        setImg(group.schedule);
      }
    }
  }, [group]);

  return (
    <EditorFormLayout
      mode={mode}
      isValid={isValid}
      redirectTo="/groups/"
      title={title}
      loading={loading}
      onAdd={async () => {
        await onAdd();

        window.setTimeout(async () => {
          await rest.onUpload();
        }, 250);
      }}
      onModify={async () => {
        await onModify();

        window.setTimeout(async () => {
          await rest.onUpload();
        }, 250);
      }}
      onClearAll={onClearAll}
      onRemove={onRemove}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            fullWidth
            label="Год"
            autoFocus
            value={year}
            onChange={onChange(setYear)}
          />
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
            {schools.map((c) => (
              <MenuItem value={c.id} key={c.id}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12}>
            <Select
              variant="outlined"
              multiple
              fullWidth
              value={coachesID || ""}
              displayEmpty
              onChange={onChangeMultiple(setCoachesID)}
              input={<Input />}
              renderValue={(selected) => (
                <div className={classes.chips}>
                  {(selected as string[])?.length
                    ? (selected as string[]).map((value) => (
                        <Chip
                          key={value}
                          label={
                            coaches.find((c) => c.id === value)?.name || ""
                          }
                          className={classes.chip}
                        />
                      ))
                    : "Тренеры"}
                </div>
              )}
            >
              {coaches.map((c) => (
                <MenuItem value={c.id} key={c.id}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {editing && (
            <Grid item xs={12}>
              <FileLoader preview={schedule} {...rest} />
            </Grid>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            label="Ссылка на телеграм"
            value={tgUrl}
            onChange={onChange(setTgUrl)}
          />
        </Grid>
      </Grid>
    </EditorFormLayout>
  );
};
