import { LiFiWidget } from '@lifi/widget';


function LifiWidgetReact({ config } : any) {
  return (
    <LiFiWidget
      config={config}
      integrator="cra-example"
    />
  );
}

export default LifiWidgetReact;
