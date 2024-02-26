'use client'
import React from 'react'
import { Modal } from '@mui/material'

import styles from './QuoteResultModal.module.css'
import Image from 'next/image'

interface QuoteResultModalProps {
  isModalOpen: boolean
  handleCloseModal: () => void
  isQuoteLoading: boolean
  blobURL: string | null
  handleDownload: () => void
}

const QuoteResultModal = ({
  isModalOpen,
  handleCloseModal,
  isQuoteLoading,
  blobURL,
  handleDownload,
}: QuoteResultModalProps) => {
  return (
    <Modal
      className={styles['modal-backdrop']}
      open={isModalOpen}
      onClose={handleCloseModal}
      closeAfterTransition
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className={styles['modal-container']}>
        <div className={styles['modal-header']}>
          <span>New quote</span>
          <button className={styles['modal-close-button']} onClick={handleCloseModal}>X</button>
        </div>
        <div className={styles['modal-result']}>
          { (blobURL === null && isQuoteLoading) && <p>Creating your new quote...</p> }
          { blobURL &&
            <>
              <Image src={blobURL} alt='generated quote card' width={580} height={360} />
              <button className={styles['modal-download-button']} onClick={handleDownload}>Download quote</button>
            </>
          }
        </div>
      </div>
    </Modal>
  )
}

export default QuoteResultModal
