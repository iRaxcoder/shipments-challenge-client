import { AddButton, CustomizedTable, Modal } from "../../components";
import { Typography } from "@mui/material";
import { AddPackage } from "./AddPackage";
import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import packageService from "../../service/packageService";

export const Main = () => {
  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
  const { data, errors, isLoading, reload } = useFetch("/packages/get");

  const [packages, setPackages] = useState();

  useEffect(() => {
    setPackages(data);
    return () => {};
  }, [data]);

  const columns = [
    { id: "NAME", label: "Name", maxWidth: 400, align: "center" },
    {
      id: "DESTINATION",
      label: "Storage location",
      maxWidth: 400,
      align: "center",
    },
    { id: "DISTANCE", label: "Distance", maxWidth: 400, align: "center" },
    { id: "STATUS", label: "Delivery status", maxWidth: 400, align: "center" },
  ];

  const onDeletePackage = (index) => {
    const selectedPackage = packages.at(index).PACKAGE_ID;
    packageService.delete({ id: selectedPackage }).then((response) => {
      console.log(response);
      reload();
    });
  };

  return (
    <>
      <Typography
        sx={{ mt: "1rem", mb: "1rem", textAlign: "center" }}
        variant="h4"
      >
        Inventory of packages
      </Typography>
      <AddButton onAdd={() => setIsOpenModalAdd(true)} />
      {!isLoading ? (
        <CustomizedTable
          action={true}
          onDelete={onDeletePackage}
          columns={columns}
          rows={packages || []}
        />
      ) : (
        <Typography sx={{ mb: 1 }} variant="h4">
          Loading packages...
        </Typography>
      )}
      {errors && (
        <Typography sx={{ mb: 1, mt: 2, color: "red" }} variant="h5">
          -An error has ocurred with fetching data.
        </Typography>
      )}
      <Modal
        isOpen={isOpenModalAdd}
        onClose={() => setIsOpenModalAdd(false)}
        title={"Register new package"}
        idForm="add_form"
        content={<AddPackage reloadPackages={reload} />}
      />
    </>
  );
};
