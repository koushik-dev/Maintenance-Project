import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Stack, Theme, Typography, useMediaQuery } from "@mui/material";
import { useStore } from "../Providers";

const Home = () => {
  const [{ activeUser }] = useStore();
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const navigate = useNavigate();

  useEffect(() => {
    // createUserforSignIn("sneha", "kou@123");
    // updateExpense(
    //   "7",
    //   map(state.months["7"].expenses, (ex: TExpense) =>
    //     ex.id === 1632
    //       ? {
    //           id: 1632,
    //           expense: "sewage_wate",
    //           reason: "washroom",
    //           amount: 1200,
    //           date: new Date(),
    //         }
    //       : ex
    //   )
    // ).then((_) => {
    //   console.log(_);
    // });
    // deleteExpense(filter(state.months["7"].expenses, (ex) => ex.id !== 3949));
  }, []);
  return (
    <Stack p={matches ? 3 : 1} gap={2}>
      <Typography variant="h5">
        Welcome{" "}
        {activeUser.has_tenant ? activeUser?.tenant?.name : activeUser?.name}!
      </Typography>
      <Stack
        className="border-2 border-solid border-slate-300 rounded"
        display="grid"
        gridTemplateColumns={"repeat(auto-fit, minmax(180px, 1fr))"}
        gap={2}
        p={matches ? 3 : 1}
      >
        {[{ name: "Residents", route: "/users" }].map(({ name, route }) => (
          <Card
            raised
            key={name}
            className="flex justify-center p-8"
            sx={{
              backgroundColor: "#93c5fd",
              minHeight: 120,
              cursor: "pointer",
            }}
            onClick={() => navigate(route)}
          >
            <Stack className="items-center justify-center">
              <Typography
                className="text-center"
                variant="body1"
                fontWeight={400}
              >
                {name}
              </Typography>
            </Stack>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
};

export default Home;
