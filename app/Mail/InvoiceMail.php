<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Barryvdh\DomPDF\Facade\Pdf;

class InvoiceMail extends Mailable
{
    use Queueable, SerializesModels;

    public $pembayaran;

    /**
     * Create a new message instance.
     *
     * @param mixed $pembayaran
     * @return void
     */
    public function __construct($pembayaran)
    {
        $this->pembayaran = $pembayaran;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        // Generate PDF invoice
        $pdf = Pdf::loadView('pdf.invoice', [
            'pemesanan' => $this->pembayaran // Sebenarnya ini adalah objek Pemesanan
        ]);

        return $this->subject('Invoice Pembayaran #' . $this->pembayaran->pembayaran->id)
                    ->view('emails.invoice', [
                        'pemesanan' => $this->pembayaran // Kirim objek pemesanan ke view
                    ])
                    ->attachData($pdf->output(), 'invoice_' . $this->pembayaran->pembayaran->id . '.pdf', [
                        'mime' => 'application/pdf',
                    ]);
    }
}