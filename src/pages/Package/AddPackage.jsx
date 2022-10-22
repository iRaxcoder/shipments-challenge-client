import { Grid, Box, TextField, Autocomplete } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Modal } from "../../components";
import { useFetch } from "../../hooks/useFetch";
import packageService from "../../service/packageService";

export const AddPackage = ({ reloadPackages }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { data, errors: errors2, isLoading } = useFetch("/locations/get");

  const [selectedLocation, setSelectedLocation] = useState();

  const [modalMessage, setModalMsg] = useState({ open: false, msg: "" });

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    setLocations(data);

    return () => {};
  }, [data]);

  const onAddPackage = (values) => {
    console.log(values);
    console.log(selectedLocation);
    packageService
      .insert({ name: values.packageName, location: selectedLocation.NAME })
      .then((response) => {
        setModalMsg({ msg: response.msg, open: true });
        reloadPackages();
        reset();
      });
  };

  return (
    <>
      <Box
        component="form"
        id="add_form"
        autoComplete="off"
        onSubmit={handleSubmit(onAddPackage)}
      >
        <Grid
          container
          justifyContent="flex-start"
          flexDirection="column"
          spacing={{ xs: 0.5, sm: 0.5, md: 2 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item>
            <TextField
              autoFocus
              margin="dense"
              {...register("packageName", { required: true })}
              helperText={errors.packageName && "field is required to proceed"}
              type="text"
              fullWidth
              variant="standard"
              error={!!errors.packageName}
              label="Package name*"
            />
          </Grid>
          <Grid item>
            <Autocomplete
              id="destination-input"
              isOptionEqualToValue={(o) => o.LOCATION_ID}
              options={locations}
              onChange={(event, newValue) => {
                setSelectedLocation(newValue);
              }}
              getOptionLabel={(option) =>
                option.NAME + " (" + option.DISTANCE + "KM away)"
              }
              getOptionDisabled={(option) => option.STATUS == 1}
              renderInput={(params) => (
                <TextField
                  helperText={
                    errors.packageLocation && "field is required to proceed"
                  }
                  {...register("packageLocation", { required: true })}
                  error={!!errors.packageLocation}
                  variant="standard"
                  {...params}
                  label="Location from warehouse*"
                />
              )}
            />
          </Grid>
        </Grid>
      </Box>
      <Modal
        isOpen={modalMessage.open}
        onClose={() => setModalMsg({ ...modalMessage, open: false })}
        title={"Message from system"}
        content={<>{modalMessage.msg}</>}
      />
    </>
  );
};
