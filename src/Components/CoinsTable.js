import {
  Container,
  createTheme,
  ThemeProvider,
  styled,
  TextField,
  TableContainer,
  LinearProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { numberWithCommas } from "./Banner/Carousel";
import "./CoinsTable.css";

function CoinsTable() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState([]);

  const { currency } = CryptoState();

  const fetchCoins = async () => {
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    );
    setCoins(data);
    setLoading(false);
  };

  console.log("coin table", coins);

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <h4 className="cointablehead">Cryptocurrency prices by Market Cap</h4>

        <TextField
          label="Search for a Crypto Currency.."
          variant="outlined"
          color="Success"
          className="cointablesearch"
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* <TableContainer className="table">
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{ color: "black", fontWeight: "700" }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch().map((row) => {
                  const profit = row.price_change_percentage_24h >= 0;

                  return (
                      <TableRow
                        key={row.name}
                        style={{ display: "flex", gap: "15px" }}
                      >
                        <TableCell
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                          component="th"
                          scope="row"
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span className="tablesymbol">{row.symbol}</span>
                            <span className="tablesymbolname">{row.name}</span>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                    {Symbol}{" "}
                    {numberWithCommas(row.current_price.toFixed(2))}
                  </TableCell>
                      </TableRow>
                    
                  );
                })}
              </TableBody>
            </Table>
          )}
        </TableContainer> */}

        <table style={{width:"100%",paddingTop:"30px"}}>
            <thead style={{backgroundColor:"#EEBC1D",color: "black"}} >
                <tr>
                    <th className="head1">Coins</th>
                    <th className="head1">Price</th>
                    <th className="head1">24 Change</th>
                    <th className="head1">Market Cap</th>
                </tr>
            </thead>
            <tbody>
            {handleSearch().map((row)=>{
            const profit = row.price_change_percentage_24h >= 0;
return(
    <tr style={{textAlign:"center"}}>
       
           <td className="firstcol" style={{textAlign:"center"}}> 
           <Link to={`/coins/${row.id}`}>
               <img  className="tableimage"
                                    src={row?.image}
                                    alt={row.name}
                                    height="50"
                                    
                                  />
                                
                                  <div
                                    style={{ display: "flex", flexDirection: "column" }}
                                  >
                                    <p className="tablesymbol">{row.symbol}</p>
                                    <p style={{marginBottom:"20px"}} className="tablesymbolname">{row.name}</p>
                                  </div>
           </Link>
                              </td> 
                              <td className="priceintable">
       
                          {Symbol}{" "}
                    {numberWithCommas(row.current_price.toFixed(2))}
                          </td>

                          <td className="profitandloss" style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}>
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                          </td>

                          <td className="marketcap">
                          {Symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                          </td>
                          
    </tr>
)
            })}
            </tbody>
        </table>

        </Container>

    </ThemeProvider>
  );
}

export default CoinsTable;
