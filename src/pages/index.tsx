export default function Home() {
  return (
    <>
      Home
      <button
        onClick={() => {
          console.log("process dta is ", process.env.NEXT_PUBLIC_GIGI);
        }}
      >
        seee
      </button>
    </>
  );
}

export const getServerSideProps = () => {
  console.log("proceess enve eee", process.env["API_URL"]);
  return {
    props: {},
  };
};
