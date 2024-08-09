import { FormProvider } from "./context/FormContext";

// Custom Components
import MultiStepForm from "./components/MultiStepForm";
import ProgressIndicator from "./components/ProgressIndicator";

const App = () => {
  return (
    <main className="relative z-[1] flex h-[550px] max-w-5xl flex-wrap justify-center gap-16 rounded-lg bg-white px-3 py-3 text-marine-blue shadow-lg lg:min-w-[895px] lg:overflow-hidden">
      <FormProvider>
        <>
          <ProgressIndicator />
          <section className="mt-20 max-w-[680px] flex-grow overflow-x-hidden rounded-lg bg-white p-5 lg:mt-0 lg:p-8">
            <MultiStepForm />
          </section>
        </>
      </FormProvider>
    </main>
  );
};
export default App;
