import { LiFiWidget } from '@lifi/widget';


function LifiWidgetReact({ config, integrator }: any) {
  const emitEvent = () => {
    const message = 'event from wc widget';
    const event = new CustomEvent('lifiEmitEvent', {
      detail: { message },
    });
    document.dispatchEvent(event);
  }
  return (
    <>
      <button onClick={emitEvent}> Emit event  </button>
      <LiFiWidget
        config={config}
        integrator={integrator}
      />
    </>
  );
}

export default LifiWidgetReact;
