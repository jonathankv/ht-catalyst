export default function AboutRedirect() {
  return null;
}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/mentoring',
      permanent: true,
    },
  };
}