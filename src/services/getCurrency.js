import { currency } from "../assets/configs/exchangeConfigs";

export function getCurrency() {
  // Todo Not working https requests for this API, find other API
  // return new Promise((resolve) => setTimeout(() =>
  //     fetch(process.env.REACT_APP_DB_URL)
  //       .then(response => response.json())
  //       .then(currency => {
  //         this.setState({ currency: currency.quotes });
  //         resolve();
  //       }),
  //   1000)
  // );

  return new Promise(resolve => setTimeout(() => {
      resolve(currency);
    }, 2000)
  );
}
