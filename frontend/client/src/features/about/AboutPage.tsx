import { Divider, Grid, Paper, Typography } from "@mui/material";
export default function AboutPage(){


   

    return (
        <Grid container spacing ={10}>
            
            <Grid item xs={6}>
            <Paper style={{ padding: '16px', background: 'primary.secondary' }}>
            <Typography variant="h6" color="primary.secondary">
      Sve je počelo u mirnom delu Knez Mihailove ulice 2011. Grupa mladih ljudi je bila spremna da na tržištu satova i nakita ponudi nešto novo i drugačije.
      Kako je vreme odmicalo, naš kolektiv se proširivao, i danas nas možete pronaći na čak šest lokacija: SC Galerija, SC Big Fashion, SC Stadion, Beo Shopping Centre, Ada Mall i u Knez Mihailovoj ulici.
      U našim radnjama ćete pored svetski priznatih brendova dobiti izvanrednu i profesionalnu uslugu, a Vaše zadovoljstvo će biti merilo našeg uspeha.
    </Typography>
    <Typography variant="body1">
      Brendovi kao što su Festina, Tissot, Casio, Seiko, Nooz, Bering i Daniel Wellington su samo deo raznovrsne ponude koju možete pronaći kod nas.
      Izuzev satova, brendovi Bering, Guess, Fossil, Lui Jo i Daniel Wellington nude prefinjene komade nakita.
      Ukoliko želite da usrećite vaše najmlađe, nemački brend Cool Time Kids nudi možda i najveći izbor dečijih satova.
    </Typography>
    <Typography variant="body2">
      Posebno mesto u našoj ponudi zauzimaju usluge servisa koji će preuzeti svu potrebnu brigu o održavanju Vašeg sata.
      Zamenu baterija i narukvica vršimo na licu mesta. Uložićemo maksimalan trud da Vaša očekivanja ispunimo i poverenje opravdamo.
    </Typography>
    <Typography variant="caption">
      Watch is watch d.o.o.
      PIB: 107341216
      Matični broj: 20784245
    </Typography>
    </Paper>
                <Divider sx={{mb:2}}/>
                
                            
            </Grid>
            <Grid item xs={6} >
                <img src = {"/Images/background.jpg"} alt={"product.name"} style={{width:'100%', height:'100%'}}/>
            </Grid>
        </Grid>
    )
}