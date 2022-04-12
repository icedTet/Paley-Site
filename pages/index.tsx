import Link from 'next/link'
import React from 'react'
import Layout from '../components/Layout'
import { Navbar } from '../components/Navbar'

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <Navbar />
    <h1 className={"text-blue-500"}>Hello Next.js 👋</h1>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
  </Layout>
)

export default IndexPage
