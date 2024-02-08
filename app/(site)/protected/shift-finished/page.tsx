const ShiftFinished = () => {
  return (
    <div className="flex flex-col items-center w-full mt-4">
      <article className="max-w-[640px] ">
        <ul className="list-image-[url(/assets/checkmark.svg)]">
          <li>podłogi umyte?</li>
          <li>okna zamknięte?</li>
          <li>światła zgaszone a lampy włączone?</li>
        </ul>
        <section className="my-4 text-center">
          <span>Jeszcze tylko pamiętaj aby się zdezynfekować i...</span>
          <h2 className="font-extrabold">Dzięki za to co robisz ❤️</h2>
        </section>
      </article>
    </div>
  );
};

export default ShiftFinished;
