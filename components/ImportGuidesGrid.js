import React from 'react'

import QuickStartCard from './QuickStartCard'

function ImportGuidesGrid() {
  return (
    <div className='grid grid-cols-1 gap-3 lg:grid-cols-4'>
      <QuickStartCard href='/tutorials/aws-rds-migration-guide' title='AWS RDS' imgPath='/docs/img/logos/aws.png' />
      <QuickStartCard
        href='/tutorials/gcp-cloudsql-migration-guide'
        title='GCP CloudSQL'
        imgPath='/docs/img/logos/gcp.png'
      />
      <QuickStartCard
        href='/tutorials/azure-database-for-mysql-migration-guide'
        title='Azure MySQL'
        imgPath='/docs/img/logos/azure.png'
      />
      <QuickStartCard
        href='/tutorials/digitalocean-database-migration-guide'
        title='Digital Ocean'
        imgPath='/docs/img/logos/digitalocean.jpeg'
      />
    </div>
  )
}

export default ImportGuidesGrid
