import { LiFiWidget } from '@lifi/widget';

import type { Route } from '@lifi/sdk';
import type { RouteExecutionUpdate, RouteHighValueLossUpdate } from '@lifi/widget';
import { WidgetEvent, useWidgetEvents } from '@lifi/widget';
import { useEffect } from 'react';
function LifiWidgetReact({ config, integrator }: any) {
  const widgetEvents = useWidgetEvents();
  const emitEvent = () => {
    const message = 'event from wc widget';
    const event = new CustomEvent('lifiEmitEvent', {
      detail: { message },
    });
    document.dispatchEvent(event);
  }
  const sdkConfig = {
    apiUrl:'https://staging.li.quest/v1'
  }
  const widgetConfig = {
     featured: [
       {
        address: '0x0000000000000000000000000000000000000000',
        symbol: 'ETH',
        decimals: 18,
        chainId: 5,
        name: 'ETH',
        logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/21334.png',
      },
      {
        address: '0xd87ba7a50b2e7e660f678a895e4b72e7cb4ccd9c',
        symbol: 'USDC',
        decimals: 18,
        chainId: 5,
        name: 'USDC',
        logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/21334.png',
      },
    ],
    // set source chain to Polygon
    fromChain: 5,
    // set destination chain to Optimism
    toChain: 5,
    //  // ETH
    fromToken: '0x0000000000000000000000000000000000000000',
    // set source token to USDC (Optimism)
    toToken: '0xd87ba7a50b2e7e660f678a895e4b72e7cb4ccd9c',
    // set source token amount to 10 USDC (Polygon)
    fromAmount: 1,
  };
   useEffect(() => {
    const onRouteExecutionStarted = (route: Route) => {
      console.log('onRouteExecutionStarted fired.',route);
    };
    const onRouteExecutionUpdated = (update: RouteExecutionUpdate) => {
      console.log('onRouteExecutionUpdated fired.',update);
    };
    const onRouteExecutionCompleted = (route: Route) => {
      console.log('onRouteExecutionCompleted fired.',route);
    };
    const onRouteExecutionFailed = (update: RouteExecutionUpdate) => {
      console.log('onRouteExecutionFailed fired.',update);
    };
    const onRouteHighValueLoss = (update: RouteHighValueLossUpdate) => {
      console.log('onRouteHighValueLoss continued.',update);
      
    };
    
    widgetEvents.on(WidgetEvent.RouteExecutionStarted, onRouteExecutionStarted);
    widgetEvents.on(WidgetEvent.RouteExecutionUpdated, onRouteExecutionUpdated);
    widgetEvents.on(WidgetEvent.RouteExecutionCompleted, onRouteExecutionCompleted);
    widgetEvents.on(WidgetEvent.RouteExecutionFailed, onRouteExecutionFailed);
    widgetEvents.on(WidgetEvent.RouteHighValueLoss, onRouteHighValueLoss);
    
    return () => widgetEvents.all.clear();
  }, [widgetEvents]);
  return (
    <>
      <button onClick={emitEvent}> Emit event  </button>
      <LiFiWidget
        sdkConfig={sdkConfig}
        config={widgetConfig}
        integrator={integrator}
      />
    </>
  );
}

export default LifiWidgetReact;
