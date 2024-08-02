import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import { Dock } from '../components/dock';
import { dockItems } from '../../data/site/index';
import useTypewriter from "react-typewriter-hook"
import Heading from '@theme/Heading';
import styles from './index.module.css';
import 'animate.css';
function HomepageHeader() {
  
  const {siteConfig} = useDocusaurusContext();
  const talk = useTypewriter(siteConfig.title);
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {talk}
        </Heading>
        <p className="hero__subtitle"></p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg animate__animated animate__flipInY"
          >
            {siteConfig.tagline}
          </Link>
        </div>
        <Dock data={dockItems}/>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`山西仓江科技有限公司`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
