'use client'
import React from 'react'
import { Modal } from '@mui/material'

import styles from './QuoteResultModal.module.css'

interface QuoteResultModalProps {
  isModalOpen: boolean
  handleCloseModal: () => void
}

const QuoteResultModal = ({ isModalOpen, handleCloseModal }: QuoteResultModalProps) => {
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
          <span>New generated quote</span>
          <button className={styles['modal-close-button']} onClick={handleCloseModal}>X</button>
        </div>
      </div>
    </Modal>
  )
}

export default QuoteResultModal
