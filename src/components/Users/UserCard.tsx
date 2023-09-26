import { Phone } from "@mui/icons-material";
import {
  Stack,
  Badge,
  Avatar,
  Typography,
  ButtonGroup,
  Button,
  Card,
  IconButton,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { updateUser } from "../../api";
import { useAuth } from "../../hooks";
import { Actions, IUser } from "../../model";
import { useStore } from "../../Providers";

export const UserCard: React.FC<IUser> = ({
  flat,
  name,
  contact_number,
  has_tenant,
  tenant,
  docId,
  maintenance: { status },
}) => {
  const { user, isAdmin } = useAuth();
  const [state, dispatch] = useStore();
  const [loading, setLoading] = useState(false);
  const togglePaymentStatus = () => {
    setLoading(true);
    updateUser(docId, { "maintenance.status": !status })
      .then(() =>
        dispatch({
          type: Actions.SET_USER,
          payload: {
            users: state.users?.map((user) =>
              user.docId === docId
                ? {
                    ...user,
                    maintenance: { ...user.maintenance, status: !status },
                  }
                : user
            ),
            userId: isAdmin ? "" : user.uid,
          },
        })
      )
      .then((_) => {
        toast.success("Payment status updated successfully.");
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  return (
    <Card
      className="flex flex-col justify-between border-l-8 border-l-blue-300 gap-2"
      sx={{ backgroundColor: "rgb(243 244 246)", py: 1.5, px: 1 }}
    >
      <Stack
        direction={"row"}
        alignItems="center"
        justifyContent={"space-between"}
        gap={2}
      >
        <Badge variant="dot" badgeContent={has_tenant ? "" : 0} color="info">
          <Avatar variant="rounded" sx={{ width: 48, height: 48 }}>
            {flat?.number || undefined}
          </Avatar>
        </Badge>
        <Stack flex={1}>
          <Typography
            variant="h6"
            textAlign={"left"}
            flex={1}
            sx={{ wordBreak: "break-word" }}
          >
            {has_tenant ? tenant.name : name}
          </Typography>
        </Stack>

        <Box className="text-right">
          <IconButton
            size="large"
            color="primary"
            LinkComponent="a"
            href={`tel:${has_tenant ? tenant.contact_number : contact_number}`}
          >
            <Phone />
          </IconButton>
        </Box>
      </Stack>
      {/* <Stack py={1}>
        <Typography variant="subtitle1">
          <PhoneEnabled /> {has_tenant ? tenant.contact_number : contact_number}
        </Typography>

        {(has_tenant ? tenant.vehicles : vehicles)?.map((v) => (
          <Typography variant="subtitle1" key={v.registration_number}>
            <EmojiTransportation /> {v.registration_number} / {v.type}
          </Typography>
        ))}
        {!(has_tenant ? tenant.vehicles : vehicles)?.length && (
          <Typography variant="subtitle1">
            <EmojiTransportation /> No Vehicles
          </Typography>
        )}
      </Stack> */}
      <Stack direction={"row"} justifyContent="space-between">
        <div></div>
        {isAdmin ? (
          <Button
            variant="contained"
            onClick={togglePaymentStatus}
            color={status ? "success" : "error"}
            disabled={loading}
          >
            {status ? "Paid" : "Unpaid"}
          </Button>
        ) : null}
      </Stack>
    </Card>
  );
};
