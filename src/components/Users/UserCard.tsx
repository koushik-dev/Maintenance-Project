import { PhoneEnabled, EmojiTransportation, Phone } from "@mui/icons-material";
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
import { IUser } from "../../model";

export const UserCard: React.FC<IUser> = ({
  flat,
  name,
  contact_number,
  vehicles,
  has_tenant,
  tenant,
}) => {
  const [paid, setPaid] = useState(false);
  return (
    <Card
      className="flex flex-col justify-between"
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
          <IconButton size="large" color="primary">
            <Phone />
          </IconButton>
        </Box>
      </Stack>
      <Stack py={1}>
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
      </Stack>
      <ButtonGroup variant="contained" fullWidth>
        <Button
          onClick={() => setPaid((p) => !p)}
          color={paid ? "success" : "error"}
        >
          {paid ? "Paid" : "Unpaid"}
        </Button>
      </ButtonGroup>
    </Card>
  );
};
