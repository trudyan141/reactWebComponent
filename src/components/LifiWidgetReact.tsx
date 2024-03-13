import { LiFiWidget } from "@lifi/widget";

import type { Route } from "@lifi/sdk";
import type {
  RouteExecutionUpdate,
  RouteHighValueLossUpdate,
} from "@lifi/widget";
import { WidgetEvent, useWidgetEvents } from "@lifi/widget";
import { useEffect } from "react";
function LifiWidgetReact({ config, integrator, isDev }: any) {
  const widgetEvents = useWidgetEvents();
  const emitEvent = () => {
    const message = "event from wc widget";
    const event = new CustomEvent("lifiEmitEvent", {
      detail: { message },
    });
    console.log("mes", message);
    document.dispatchEvent(event);
  };
  const sdkConfig = {
    apiUrl: "https://staging.li.quest/v1",
  };
  // const style = JSON.parse(config);
  // console.log(config);
  const widgetConfigPro = {
    containerStyle: config.containerStyle,
    featured: [
      {
        address: "0xc7198437980c041c805A1EDcbA50c1Ce5db95118",
        chainId: 43114,
        symbol: "USDT.e",
        decimals: 6,
        name: "Tether USD",
        coinKey: "USDT",
        logoURI:
          "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png",
        priceUSD: "1.000495",
      },
      {
        address: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
        chainId: 43114,
        symbol: "USDC",
        decimals: 6,
        name: "USD Coin",
        coinKey: "USDC",
        logoURI:
          "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
        priceUSD: "1",
      },
      // {
      //   "address": "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664",
      //   "chainId": 43114,
      //   "symbol": "USDC.e",
      //   "decimals": 6,
      //   "name": "Bridged USD Coin",
      //   "coinKey": "USDCe",
      //   "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
      //   "priceUSD": "1"
      // },
    ],
    // set source chain to Polygon
    fromChain: 43114,
    // set destination chain to Optimism
    toChain: 43114,
    //  // ETH
    fromToken: "0xc7198437980c041c805A1EDcbA50c1Ce5db95118",
    // set source token to USDC (Optimism)
    toToken: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
    // set source token amount to 10 USDC (Polygon)
    fromAmount: 1,
  };
  const widgetConfigDev = {
    containerStyle: config.containerStyle,
    featured: [
      {
        address: "0x0000000000000000000000000000000000000000",
        symbol: "ETH",
        decimals: 18,
        chainId: 5,
        name: "ETH",
        logoURI:
          "https://s2.coinmarketcap.com/static/img/coins/64x64/21334.png",
      },
      {
        address: "0xd87ba7a50b2e7e660f678a895e4b72e7cb4ccd9c",
        symbol: "USDC",
        decimals: 18,
        chainId: 5,
        name: "USDC",
        logoURI:
          "https://s2.coinmarketcap.com/static/img/coins/64x64/21334.png",
      },
    ],
    // set source chain to Polygon
    fromChain: 5,
    // set destination chain to Optimism
    toChain: 5,
    //  // ETH
    fromToken: "0x0000000000000000000000000000000000000000",
    // set source token to USDC (Optimism)
    toToken: "0xd87ba7a50b2e7e660f678a895e4b72e7cb4ccd9c",
    // set source token amount to 10 USDC (Polygon)
    fromAmount: 1,

    theme: {
      palette: {
        primary: { main: "#D57A65" },
        secondary: { main: "#FFFFFF" },
        background: {
          paper: "#FFFFFF", // bg color for cards
          default: "#FFFFFF", // bg color container
        },
        grey: {
          300: "#DCDCDC", // border light theme
          // 800: "#000000", // border dark theme
        },
      },
      shape: {
        borderRadius: 20,
        borderRadiusSecondary: 8,
      },
      typography: {
        fontFamily: "Inter",
      },
    },
  };
  useEffect(() => {
    const onRouteExecutionStarted = (route: Route) => {
      console.log("onRouteExecutionStarted fired.", route);
    };
    const onRouteExecutionUpdated = (update: RouteExecutionUpdate) => {
      console.log("onRouteExecutionUpdated fired.", update);
    };
    const onRouteExecutionCompleted = (route: Route) => {
      console.log("onRouteExecutionCompleted fired.", route);
    };
    const onRouteExecutionFailed = (update: RouteExecutionUpdate) => {
      console.log("onRouteExecutionFailed fired.", update);
    };
    const onRouteHighValueLoss = (update: RouteHighValueLossUpdate) => {
      console.log("onRouteHighValueLoss continued.", update);
    };

    widgetEvents.on(WidgetEvent.RouteExecutionStarted, onRouteExecutionStarted);
    widgetEvents.on(WidgetEvent.RouteExecutionUpdated, onRouteExecutionUpdated);
    widgetEvents.on(
      WidgetEvent.RouteExecutionCompleted,
      onRouteExecutionCompleted
    );
    widgetEvents.on(WidgetEvent.RouteExecutionFailed, onRouteExecutionFailed);
    widgetEvents.on(WidgetEvent.RouteHighValueLoss, onRouteHighValueLoss);

    return () => widgetEvents.all.clear();
  }, [widgetEvents]);
  return (
    <>
      <button onClick={emitEvent}> Emit event </button>
      {integrator === "dev" ? (
        <LiFiWidget
          sdkConfig={sdkConfig}
          config={widgetConfigDev}
          integrator={integrator}
        />
      ) : (
        <LiFiWidget integrator={integrator} config={widgetConfigPro} />
      )}
    </>
  );
}

export default LifiWidgetReact;
