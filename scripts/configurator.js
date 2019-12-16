    var configText = "";
    var productText= "";
    var finalText = "";
    var productPrice = 0;
    var configPrice = 0.00;
    var user_choice = "config"; // usato nello step 3 per determinare
                                // se l'utente ci è arrivato premendo
                                // buy o config
    var newsletter = "";        // usato per la dichiarazione di sottoscrizione alla newsletter
    

    $(document).ready(function() {
        //Initialize tooltips
        //$('.nav-tabs > li a[title]').tooltip();

        //Wizard
        $('a[data-toggle="tab"]').on('show.bs.tab', function(e) {
            var $target = $(e.target);

            if ($target.parent().hasClass('disabled')) {
                return false;
            }

            window.scrollTo(0,0);
        });

        $(".next-step, .btn-config").click(function(e) {

            var $active = $('.wizard .nav-tabs li.active');
            $active.next().removeClass('disabled');
            nextTab($active);
        });

        $(".prev-step").click(function(e) {
            var $active = $('.wizard .nav-tabs li.active');
            prevTab($active);
            if(user_choice=='buy' && $('.wizard .nav-tabs li').index($active) == 2)
                $(".wizard .nav-tabs a[href='#step1']").tab('show');   //andiamo allo step1
        });


        // disabilitiamo il next-step della shipping form
        $("#step4 .btn.next-step").attr("disabled", "disabled");
        // lo attiviamo solo se l'utente accetta i terms&conditions
        $("#chk_acceptance").change(function(event) {
            /* Act on the event */
            if(document.getElementById("chk_acceptance").checked == true)
                $("#step4 .btn.next-step").removeAttr("disabled");
            else
                $("#step4 .btn.next-step").attr("disabled", "disabled");
        });

        $("#chk_newsletter").change(function(event) {
            newsletter = ($('#chk_newsletter').is(':checked') ? '' : 'not');
        });


        $('.btn-product').click(function(event) {
            $('#config_form').trigger('reset');
            productText = $(this).data('text');
            productPrice = parseInt(this.value);
            configPrice = productPrice;
            $('#total_holder').text(configPrice);
        });

        $('.btn-buy').click(function() {
            user_choice='buy';
        });

        $('.btn-config').click(function() {
            // nascondiamo i controlli di configurazione opzioni di ciascun modello
            // e mostriamo solo quelli del modello scelto
            user_choice='config';
            $('.configurator').hide();
            $('#config_' + $(this).attr('id')).show();
        });

        // il bottone BUY del form di config
        $(".next-step#form_submit").click(function(event) {
            /* Act on the event */
            // Commentato perchè sembra resettare tutte le impostazioni
            // probabilmente agisce asincrono 
            // mentre ll pagina del wizard è già cambiata
            // e quindi non è più visibile, invalidando il selettore :visible
            // del ciclo for di computeTotalText
            // computeTotalText();
        });

        // quando vengono cliccati i bottoni degli hdd main
        // vengono disattivati i bottoni degli hdd di backup
        // e attivati solo quelli degli elementi corrispondenti
        $('.configurator.as-advanced input[name=hdd]').change(function() {
            var $size=$(this).data('size');
            var $parent = $(this).parents('.configurator');
            var $dest= $parent.find('input[name=hdb]');
            var $enabled = $parent.find('.hdb input[data-size="'  +$size+'"]');

            // disattiviamo tutti gli hdb
            checkUncheck($dest);

            // abilitiamo solo gli hdb che hanno lo stesso taglio dell'hdd main
            checkUncheck($dest.filter('[data-size="' + $size + '"]'), 'enabled')

            // attiviamo il primo in ordine DOM
            checkUncheck($dest.filter('[data-size="' + $size + '"]').first(), 'active')

            computeTotalText();
        });

        $('.configurator input').change(function(event) {
            computeTotalText();
        });

        $('.btn-buy.btn-product').click(function(event) {
            
            $('a[href="#step3"]').closest('li').removeClass('disabled');
            $('a[href="#step3"]').click();
            computeTotalText();

        });

        $('.copy-from-shipping').click(function(event) {
            $('.form-shipping [id^=shipping].form-control').each(function() {
                $('.form-shipping #' + $(this).attr('id').replace('shipping', 'billing')).val($(this).val());
            });
        });

        $('.btn-shipping').click(function(event) {
            finalizeEmail()
        });

        $('.copy-email-text').click(function(event) {
            finalizeEmail();
            var dummy = document.createElement("textarea");
            // Add it to the document
            document.body.appendChild(dummy);
            // Set its ID
            dummy.setAttribute("id", "dummy_id");
            // Output the array into it  
            document.getElementById("dummy_id").value = finalText; 

            // Select it
            if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
                var el = document.getElementById("dummy_id");
                el.contentEditable = true;
                el.readOnly = false;
                var range = document.createRange();
                range.selectNodeContents(el);
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
                el.setSelectionRange(0, 999999);
                // el.contentEditable = editable;
                // el.readOnly = readOnly;
            } else {
                dummy.select();
            }
            // Copy its contents
            document.execCommand("copy");
            // Remove it as its not needed anymore
            document.body.removeChild(dummy);
            alert( text_copied_ok + "info@seelake.it");
        });

        $('.launch-email').click(function() {
            finalizeEmail(); 
            // lancia l'hyperlink mailto
            window.location.href = $('input#ebody').val();
        });
    });

    /**
        per la sezione visibile di configuratore (= per il prodotto selezionato)
        attraversa tutti i controlli:
        per quelli attivi (=con label active) accoda il relativo testo
        e il relativo valore ai rispettivi totali
        e aggiorna il totale di prezzo in calce alla schermata
    */
    function computeTotalText() {
        configPrice = productPrice;
        configText =  productText;
        $('.configurator:visible label.active input').each(function() {
            configPrice += parseInt(this.value);
            configText += "\n -  " + $(this).data('text');
        });
        configPrice = configPrice.toFixed(2)
        configText +=" \nPrice: € " + configPrice.toString() + " VAT excl."
        $('#total_holder').text(configPrice);
    }

    function nextTab(elem) {
        $(elem).next().find('a[data-toggle="tab"]').click();
    }

    function prevTab(elem) {
        $(elem).prev().find('a[data-toggle="tab"]').click();
    }

    /**
        usato per impostare lo stato checked/unchecked 
        dei radiobutton - specificatamente per gli hd
    */
    function checkUncheck(elem, flag) {
        if(!flag)
            flag = 'reset';

        if(flag=='reset') {
            $(elem).attr('checked', false);
            $(elem).parent().removeClass('active').addClass('disabled');
        }
        if(flag=='enabled') {
            $(elem).attr('checked', false)
            $(elem).parent().removeClass('disabled').removeClass('active')
        }
        if(flag=='active') {
            $(elem).attr('checked', 'checked')
            $(elem).parent().removeClass('disabled').addClass('active')
        }
    }

    function finalizeEmail() {
        var text_mailto = "mailto:info@seelake.com?subject=quotation+inquiry&body=";
        var email = text_free_email;    // il text template è in calce nel confgurator.html
        var platform = navigator.platform;
        if (platform.search(/win/i) >= 0)
            email = email.replace(/\n/g, "\r\n");

        // per ciascun campo della form facciamo un replace della
        // corrispondente placeholder nel testo dell'email
        // con il corrispondente valore inserito
        $('.form-shipping .form-control').each(function() {
            email = email.replace('_' + $(this).attr('id') + '_', $(this).val());
        });
        // gli option li gestiam a parte
        email = email.replace('_payment_mode_', 
            $('input[name=optradio]:checked', '.form-shipping').val()
        );
        // la check della newsletter la gestiamo qua
        email = email.replace('_Newsletter_', 'I choose to ' + newsletter + ' subscribe to Seelake newsletter.');


        // descrizione prodotto
        email = email.replace('_items_text_', configText);

        // togliamo le tabulazioni del codice
        email = email.replace(/\t/g, "")
        finalText=email;
        text_mailto += encodeURIComponent(email);
        $('input#ebody').val(text_mailto);
        $('#emailTextContent').html(email.replace(/\n/g, '<br>'));
    }