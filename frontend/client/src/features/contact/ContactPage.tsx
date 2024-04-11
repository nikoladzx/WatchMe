import React from "react";
import {
  Paper,
  CssBaseline, 
  Divider,
  Grid,
  Container,
  Button,
  Typography,
  Link,
  Box
} from "@mui/material";

import Avatar from "@mui/material/Avatar";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";

export default function ContactPage() {
  return (
    <Container component="main">
      <CssBaseline />
      <React.Fragment>
        <Paper sx={{ p: 3, mb: 4, mt: 2 }} variant="outlined">
          

          <Grid style={{ display: "flex", flexDirection: "column" }}>
            <Typography
              component="h1"
              align="center"
              sx={{ fontSize: 40, color: "#bbbbbb" }}
            >
              Contact{" "}
              <Link style={{ color: "#618fba", textDecoration: "none" }}>
                WatchMe
              </Link>
            </Typography>
          </Grid>
          <Box sx={{ mb: 3 }} >
            <Divider sx={{ mt: 4, mb: 3 }}> More about us </Divider>
            <Typography
              component="h1"
              align="center"
              sx={{ m: 2, color: "#bbbbbb" }}
            >
              Koncept multibrend radnje koja će na jednom mestu spojiti renomirane svetske brendove i uz izvanrednu i profesionalnu uslugu biti adresa na kojoj će Vaše zadovoljstvo biti merilo našeg uspeha.
            </Typography>
          </Box>

          

          <Box sx={{ mb: 3 }} >
            <Divider sx={{ mt: 3, mb: 3 }}> Our Team </Divider>
            <Grid
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <Grid
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  style={{
                    marginBottom: 5,
                    fontWeight: "bold",
                    
                  }}
                >
                  WatchMe
                </Typography>
                <Avatar
                  alt="Remy Sharp"
                  src={process.env.PUBLIC_URL + "/images/background.jpg"}
                  sx={{ width: 100, height: 100 }}
                />
                
                <Typography>
                Sve je počelo u mirnom delu Knez Mihailove ulice 2011. Grupa mladih ljudi je bila spremna da na tržištu satova i nakita ponudi nešto novo i drugačije. Kako je vreme odmicalo tako se naš kolektiv proširivao pa nas danas možete pronaći na čak šest lokacija (SC Galerija, SC Big Fashion, SC Stadion, Beo Shopping Centre, Ada Mall i u Knez Mihailovoj ulici). U našim radnjama ćete pored svetski priznatih brendova dobiti i izvanrednu i profesionalnu uslugu a Vaše zadovoljstvo će biti merilo našeg uspeha.

Brendovi: Festina, Tissot, Casio, Seiko, Nooz, Bering, Daniel Wellington su samo delić raznovrsne ponude koju možete pronaći kod nas. Izuzev satova, brendovi Bering, Guess, Fossil, Lui Jo, Daniel Wellington nude Vam prefinjene komade nakita. Ukoliko želite da usrećite vaše najmlađe u tome će Vam pomoći nemački brend Cool Time Kids koji nudi možda i najveći izbor dečijih satova.

Posebno mesto u našoj ponudi zauzimaju usluge servisa koji će preuzieti svu potrebnu brigu o održavanju Vašeg sata. Zamenu baterija i narukvica vršimo na licu mesta. Uložićemo maksimalan trud da Vaša očekivanja ispunimo a poverenje opravdamo.

Watch is watch d.o.o.
PIB: 107341216
Matični broj: 20784245
                </Typography>
                
              </Grid>
            </Grid>


            <Divider sx={{ mt: 5, mb: 3 }}>
              
              SOCIAL MEDIA
            </Divider>
            <Grid
              container
              style={{
                marginTop: 3,
                marginLeft: 1,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
              spacing={3}
              sx={{ mb: 4 }}
            >
              <Button
                sx={{ m: 1, borderRadius: 50 }}
                variant="contained"
                href="https://facebook.com"
              >
                {" "}
                <FacebookIcon />{" "}
              </Button>
              <Button
                sx={{ m: 1, borderRadius: 50 }}
                variant="contained"
                href="https://instagram.com"
              >
                {" "}
                <InstagramIcon />{" "}
              </Button>
              <Button
                sx={{ m: 1, borderRadius: 50 }}
                variant="contained"
                href="https://twitter.com"
              >
                {" "}
                <TwitterIcon />{" "}
              </Button>
              <Button
                sx={{ m: 1, borderRadius: 50 }}
                variant="contained"
                href="https://linkedin.com"
              >
                {" "}
                <LinkedInIcon />{" "}
              </Button>
              <Button
                sx={{ m: 1, borderRadius: 50 }}
                variant="contained"
                href="https://youtube.com"
              >
                {" "}
                <YouTubeIcon />{" "}
              </Button>
            </Grid>
          </Box>
        </Paper>
      </React.Fragment>
    </Container>
  );
}
