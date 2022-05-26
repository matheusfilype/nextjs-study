import { GetStaticProps } from "next";
import Head from "next/head";
import { getPrismicClient } from "../../services/prismic";
import styles from "./styles.module.scss";
import Prismic from "@prismicio/client";

export default function Posts() {
  return (
    <>
      <Head>
        <title> Posts | ignews </title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="">
            <time>12 março de 2022</time>
            <strong>Teste</strong>
            <p>Teste body</p>
          </a>

          <a href="">
            <time>12 março de 2022</time>
            <strong>Teste</strong>
            <p>Teste body</p>
          </a>

          <a href="">
            <time>12 março de 2022</time>
            <strong>Teste</strong>
            <p>Teste body</p>
          </a>

          <a href="">
            <time>12 março de 2022</time>
            <strong>Teste</strong>
            <p>Teste body</p>
          </a>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic?.get({
    pageSize: 10,
    fetch: ["publication.title", "publication.content"],
  });

  console.log(response);

  return {
    props: {},
  };
};
