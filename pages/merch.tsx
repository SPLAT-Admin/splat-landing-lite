import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/storefront",
      permanent: false,
    },
  };
};

export default function MerchPage() {
  return null;
}
