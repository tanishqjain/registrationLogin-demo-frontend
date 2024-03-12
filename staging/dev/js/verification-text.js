// 2021-04-09 12:50
const verificationTexts = {
  en: {
    success: {
      header: 'Account verified',
      message: 'Your account has been verfied.',
      buttonText: 'Log in to your account'
    },
    expired: {
      header: 'Verification session expired',
      message: `This verification link has expired. Please log in again to send a new verification link to your email.`,
      buttonText: 'Log in to your account'
    },
    error: {
      header: 'Something went wrong',
      message: 'We were unable to verify your account.',
      secondMessage: 'Please, try again later',
    }
  }, 	 
  bg: {
    success: {
      header: 'Акаунтът е потвърден',
      message: 'Вашият акаунт беше потвърден',
      buttonText: 'Влизане във вашия акаунт'
  },
    expired: {
      header: 'Сесията за потвърждаване изтече',
      message: 'Този линк за потвърждение е изтекъл. Моля, влезте отново и изпратете нов линк за потвърждение на вашия имейл',
      buttonText: 'Влизане във вашия акаунт'
    },
    error: {
      header: 'Нещо се обърка',
      message: 'Не успяхме да потвърдим вашия акаунт',
      secondMessage: 'Опитайте отново по-късно',
    }
  }, 	 
  cs: {
    success: {
      header: 'Účet ověřen',
      message: 'Váš účet byl ověřen.',
     buttonText: 'Přihlaste se do svého účtu.'
    },
    expired: {
      header: 'Platnost relace ověření vypršela.',
      message: 'Platnost tohoto ověřovacího odkazu vypršela. Přihlaste se znovu a my Vám na e-mail pošleme ověřovací odkaz.',
      buttonText: 'Přihlaste se do svého účtu.'
    },
    error: {
      header: 'Něco se pokazilo.',
      message: 'Nepodařilo se nám ověřit Váš účet.',
      secondMessage: 'Zkuste to znovu později.',
    }
  }, 	 
  da: {
    success: {
      header: 'Konto bekræftet',
      message: 'Din konto er blevet bekræftet',
      buttonText: 'Log ind på din konto'
    },
    expired: {
      header: 'Bekræftelsesprocessen er udløbet',
      message: 'Dette bekræftelseslink er udløbet. Log ind igen for at få sendt et nyt bekræftelseslink til din e-mail',
      buttonText: 'Log ind på din konto'
    },
    error: {
      header: 'Der opstod en fejl.',
      message: 'Vi kunne ikke bekræfte din konto',
      secondMessage: 'Prøv igen senere',
    }
  }, 	 
  de: {
    success: {
      header: 'Konto verifiziert',
      message: 'Ihr Konto wurde verifiziert.',
      buttonText: 'Loggen Sie sich in Ihr Konto ein.'
    },
    expired: {
      header: 'Die Verifizierungssitzung ist abgelaufen.',
      message: 'Dieser Verifizierungslink ist nicht mehr gültig. Bitte melden Sie sich erneut an, um einen neuen Verifizierungslink an Ihre E-Mail zu senden.',
      buttonText: 'Loggen Sie sich in Ihr Konto ein.'
    },
    error: {
      header: 'Etwas ist schiefgelaufen.',
      message: 'Wir konnten Ihr Konto nicht verifizieren.',
      secondMessage: 'Bitte, versuchen Sie es später noch einmal.',
    }
  }, 	 
  el: {
    success: {
      header: 'Ο λογαριασμός επαληθεύτηκε',
      message: 'Ο λογαριασμός σας επαληθεύτηκε',
      buttonText: 'Συνδεθείτε στον λογαριασμό σας'
    },
    expired: {
      header: 'Η συνεδρία επαλήθευσης έληξε',
      message: 'Αυτός ο σύνδεσμος επαλήθευσης έχει λήξει. Συνδεθείτε ξανά για να αποσταλεί νέος σύνδεσμος επαλήθευσης στο email σας',
      buttonText: 'Συνδεθείτε στον λογαριασμό σας'
    },
    error: {
      header: 'Παρουσιάστηκε κάποιο σφάλμα',
      message: 'Δεν μπορέσαμε να επαληθεύσουμε τον λογαριασμό σας',
      secondMessage: 'Δοκιμάστε πάλι αργότερα',
    }
  }, 	
  es: {
    success: {
      header: 'Cuenta verificada',
      message: 'Se ha verificado tu cuenta.',
      buttonText: 'Iniciar sesión en tu cuenta'
    },
    expired: {
      header: 'La sesión de verificación ha caducado.',
      message: 'Este enlace de verificación ha caducado. Inicia sesión otra vez para que se envíe un enlace de verificación nuevo a tu correo electrónico.',
      buttonText: 'Iniciar sesión en tu cuenta'
    },
    error: {
      header: 'Algo ha ido mal.',
      message: 'No se ha podido verificar tu cuenta.',
      secondMessage: 'Inténtalo de nuevo más tarde.',
    }
  }, 	 
  et: {
    success: {
      header: 'Konto on kinnitatud',
      message: 'Teie konto on kinnitatud',
      buttonText: 'Logige sisse oma kontoga'
    },
    expired: {
      header: 'Kinnitusseanss aegus',
      message: 'Kinnituslink on aegunud. Kinnituslingi meili uuestisaatmiseks logige uuesti sisse',
      buttonText: 'Logige sisse oma kontoga'
    },
    error: {
      header: 'Midagi läks viltu',
      message: 'Meil ei õnnestunud teie kontot kinnitada',
      secondMessage: 'Proovige hiljem uuesti',
    }
  }, 	 
  fi: {
    success: {
      header: 'Tili vahvistettu',
      message: 'Tilisi on vahvistettu',
      buttonText: 'Kirjaudu sisään tilillesi'
    },
    expired: {
      header: 'Vahvistusistunto on vanhentunut',
      message: 'Tämä vahvistuslinkki on vanhentunut. Kirjaudu uudelleen sisään ja lähetä uusi vahvistuslinkki sähköpostiisi',
      buttonText: 'Kirjaudu sisään tilillesi'
    },
    error: {
      header: 'Jokin meni vikaan',
      message: 'Emme kyenneet vahvistamaan tiliäsi',
      secondMessage: 'Yritä myöhemmin uudelleen',
    }
  }, 	 
  fr: {
    success: {
      header: 'Compte vérifié',
      message: 'Votre compte a été vérifié',
      buttonText: 'Connexion à votre compte'
    },
    expired: {
      header: 'La session de vérification a expiré',
      message: 'Ce lien de vérification a expiré. Veuillez vous connecter à nouveau pour envoyer un nouveau lien de vérification à votre adresse e-mail',
      buttonText: 'Connexion à votre compte'
    },
    error: {
      header: 's\'est produite',
      message: 'Nous ne sommes pas en mesure de vérifier votre compte',
      secondMessage: 'Veuillez réessayer ultérieurement',
    }
  }, 	 
  hr: {
    success: {
      header: 'Račun potvrđen',
      message: 'Vaš je račun potvrđen',
      buttonText: 'Prijavite se u svoj račun'
    },
    expired: {
      header: 'Sesija provjere je istekla',
      message: 'Ova poveznica za provjeru je istekla. Prijavite se ponovo kako biste na svoju e-poštu poslali novu poveznicu za provjeru',
      buttonText: 'Prijavite se u svoj račun'
    },
    error: {
      header: 'Došlo je do pogreške',
      message: 'Nismo uspjeli potvrditi vaš račun',
      secondMessage: 'Pokušajte ponovno kasnije',
    }
  }, 	 
  hu: {
    success: {
      header: 'Fiók igazolva',
      message: 'Az Ön fiókja igazolásra került',
      buttonText: 'Jelentkezzen be a fiókjába'
    },
    expired: {
      header: 'A visszaigazoló munkamenet lejárt',
      message: 'A visszaigazoló hivatkozás lejárt. Kérjük, jelentkezzen be ismét, és küldjön egy új visszaigazoló üzenetet e-mail-címére',
      buttonText: 'Jelentkezzen be a fiókjába'
    },
    error: {
      header: 'Valami hiba történt',
      message: 'Nem sikerült visszaigazolni a fiókját',
      secondMessage: 'Kérjük, próbálja újra később',
    }
  }, 	
  it: {
    success: {
      header: 'Account verificato',
      message: 'Il tuo account è stato verificato',
      buttonText: 'Accedi al tuo account'
    },
    expired: {
      header: 'La sessione di verifica è scaduta',
      message: 'Il link di verifica è scaduto. Ti preghiamo di effettuare nuovamente il login per farti inviare un nuovo link di verifica via email',
      buttonText: 'Accedi al tuo account'
    },
    error: {
      header: 'Si è verificato un problema',
      message: 'Non è stato possibile verificare il tuo account',
      secondMessage: 'Si prega di riprovare in seguito',
    }
  }, 	 
  lt: {
    success: {
      header: 'Paskyra patvirtinta',
      message: 'Jūsų paskyra patvirtinta',
      buttonText: 'Prisijunkite prie savo paskyros'
    },
    expired: {
      header: 'Baigėsi patvirtinimo seanso laikas',
      message: 'Baigėsi patvirtinimo nuorodos galiojimo laikas. Prisijunkite dar kartą, kad savo el. paštu gautumėte naują patvirtinimo nuorodą',
      buttonText: 'Prisijunkite prie savo paskyros'
    },
    error: {
      header: 'Kažkas nepavyko',
      message: 'Jūsų paskyros patvirtinti nepavyko',
      secondMessage: 'Vėliau bandykite dar kartą',
    }
  }, 	 
  lv: {
    success: {
      header: 'Konts ir verificēts',
      message: 'Jūsu konts ir verificēts',
      buttonText: 'Pieslēdzieties savam kontam'
    },
    expired: {
      header: 'Verifikācijas sesija ir beigusies',
      message: 'Šīs verifikācijas saites derīguma termiņš ir beidzies. Lūdzu, piesakieties vēlreiz, lai uz savu e-pastu nosūtītu jaunu verifikācijas saiti',
      buttonText: 'Pieslēdzieties savam kontam'
    },
    error: {
      header: 'Kaut kas nogāja greizi',
      message: 'Mēs nevarējām verificēt jūsu kontu',
      secondMessage: 'Lūdzu, mēģiniet vēlreiz vēlāk',
    }
  }, 	 
  no: {
    success: {
      header: 'Konto bekreftet',
      message: 'Din konto er bekreftet',
      buttonText: 'Logg inn til din konto'
    },
    expired: {
      header: 'Bekreftelsesøkten er utløpt',
      message: 'Denne bekreftelseslenken er utløpt. Logg inn igjen for å sende en ny bekreftelseslenke til din e-post',
      buttonText: 'Logg inn til din konto'
    },
    error: {
      header: 'Noe gikk galt',
      message: 'Vi var ikke i stand til å bekrefte din konto',
      secondMessage: 'Prøv igjen senere.',
    }
  }, 	 
  nl: {
    success: {
      header: 'Account geverifieerd',
      message: 'Je account is geverifieerd',
      buttonText: 'Aanmelden op je account'
    },
    expired: {
      header: 'Verificatiesessie verlopen',
      message: 'Deze verificatielink is verlopen. Meld je opnieuw aan om een nieuwe verificatielink naar je e-mail te sturen',
      buttonText: 'Aanmelden op je account'
    },
    error: {
      header: 'Er is iets fout gegaan',
      message: 'We konden je account niet verifiëren',
      secondMessage: 'Probeer het later opnieuw',
    }
  }, 	 
  pl: {
    success: {
      header: 'Konto zweryfikowane',
      message: 'Twoje konto zostało zweryfikowane',
      buttonText: 'Zaloguj się na swoje konto'
    },
    expired: {
      header: 'Sesja weryfikacyjna wygasła',
      message: 'Ten link weryfikacyjny wygasł. Zaloguj się ponownie, aby wysłać nowy link weryfikacyjny na Twój adres e-mail.',
      buttonText: 'Zaloguj się na swoje konto'
    },
    error: {
      header: 'Wystąpił błąd',
      message: 'Nie udało nam się zweryfikować Twojego konta',
      secondMessage: 'Spróbuj ponownie później',
    }
  }, 	 
  pt: {
    success: {
      header: 'Conta verificada',
      message: 'A sua conta foi verificada',
      buttonText: 'Inicie sessão na sua conta'
    },
    expired: {
      header: 'A sessão de verificação expirou',
      message: 'Esta ligação de verificação expirou. Inicie a sessão outra vez para enviar uma nova ligação de verificação para o seu e-mail',
      buttonText: 'Inicie sessão na sua conta'
    },
    error: {
      header: 'Ocorreu um erro',
      message: 'Não conseguimos verificar a sua conta',
      secondMessage: 'Tente novamente mais tarde',
    }
  }, 	 
  ro: {
    success: {
      header: 'Cont verificat',
      message: 'Contul dvs. a fost verificat',
      buttonText: 'Autentificare în contul dvs.'
    },
    expired: {
      header: 'Sesiunea de verificare a expirat',
      message: 'Acest link de verificare a expirat. Vă rugăm să vă autentificați din nou pentru a trimite un nou link de verificare la adresa dvs. de e-mail',
      buttonText: 'Autentificare în contul dvs.'
    },
    error: {
      header: 'A apărut o problemă',
      message: 'Nu v-am putut verifica contul',
      secondMessage: 'Vă rugăm să încercați mai târziu',
    }
  }, 	 
  ru: {
    success: {
      header: 'Учетная запись подтверждена',
      message: 'Ваша учетная запись была подтверждена',
      buttonText: 'Авторизоваться в своей учетной записи'
    },
    expired: {
      header: 'Время сеанса подтверждения истекло',
      message: 'Срок действия этой ссылки для подтверждения истек. Авторизуйтесь в системе еще раз, чтобы отправить новую ссылку для подтверждения на свою электронную почту',
      buttonText: 'Авторизоваться в своей учетной записи'
    },
    error: {
      header: 'Что-то пошло не так',
      message: 'Нам не удалось подтвердить вашу учетную запись',
      secondMessage: 'Повторите попытку позже',
    }
  }, 	 
  sk: {
    success: {
      header: 'Účet je overený',
      message: 'Váš účet je overený',
      buttonText: 'Prihlásenie do vášho účtu'
    },
    expired: {
      header: 'Relácia overenia uplynula',
      message: 'Tento overovací odkaz uplynul. Opätovným prihlásením sa odošlete nový overovací odkaz do svojho e-mailu',
      buttonText: 'Prihlásenie do vášho účtu'
    },
    error: {
      header: 'Vyskytla sa chyba',
      message: 'Nepodarilo sa nám overiť váš účet',
      secondMessage: 'Skúste to znova neskôr',
    }
  }, 	 
  sl: {
    success: {
      header: 'Račun je bil preverjen',
      message: 'Vaš račun je bil preverjen',
      buttonText: 'Prijava v vaš račun'
    },
    expired: {
      header: 'Seja preverjanja je potekla',
      message: 'Ta povezava za preverjanje je potekla. Ponovno se prijavite in pošljite novo povezavo za preverjanje na svoj e-poštni naslov',
      buttonText: 'Prijava v vaš račun'
    },
    error: {
      header: 'Prišlo je do težave',
      message: 'Ni nam uspelo preveriti vašega računa',
      secondMessage: 'Poskusite znova pozneje.',
    }
  }, 	
  sr: {
    success: {
      header: 'Налог потврђен',
      message: 'Ваш налог је потврђен',
      buttonText: 'Пријавите се на свој налог'
    },
    expired: {
      header: 'Сесија потврђивања је истекла',
      message: 'Ова веза за потврђивање је истекла. Пријавите се поново да бисте послали нову везу за потврђивање на своју е-адресу',
      buttonText: 'Пријавите се на свој налог'
    },
    error: {
      header: 'Нешто није у реду',
      message: 'Нисмо могли да потврдимо ваш налог',
      secondMessage: 'Пробајте поново касније',
    }
  }, 	 
  sv: {
    success: {
      header: 'Konto bekräftat',
      message: 'Ditt konto har bekräftats',
      buttonText: 'Logga in på ditt konto'
    },
    expired: {
      header: 'Verifieringssessionen har gått ut',
      message: 'Verifieringslänken har gått ut. Logga in på ditt konto igen för att skicka en ny verifieringslänk till din e-post',
      buttonText: 'Logga in på ditt konto'
    },
    error: {
      header: 'Någonting gick fel',
      message: 'Vi kan inte bekräfta ditt konto',
      secondMessage: 'Försök igen senare',
    }
  }, 	 
  tr: {
    success: {
      header: 'Hesap doğrulandı',
      message: 'Hesabınız doğrulandı',
      buttonText: 'Hesabınızda oturum açın'
    },
    expired: {
      header: 'Doğrulama oturumunun süresi doldu',
      message: 'Bu doğrulama bağlantısının süresi doldu. E-posta adresinize yeni bir doğrulama kodu göndermek için lütfen yeniden oturum açın',
      buttonText: 'Hesabınızda oturum açın'
    },
    error: {
      header: 'Bir şeyler ters gitti',
      message: 'Hesabınızı doğrulayamadık',
      secondMessage: 'Lütfen daha sonra tekrar deneyin',
    }
  }, 	 
  uk: {
    success: {
      header: 'Обліковий запис підтверджено',
      message: 'Ваш обліковий запис підтверджено',
      buttonText: 'Увійти'
    },
    expired: {
      header: 'Сеанс підтвердження завершився',
      message: 'Термін дії цього посилання для підтвердження сплинув. Заново ввійдіть у систему, щоб надіслати нове посилання на свою електронну адресу',
      buttonText: 'Увійдіть у свій акаунт'
    },
    error: {
      header: 'Сталася помилка',
      message: 'Нам не вдалося підтвердити ваш акаунт',
      secondMessage: 'Спробуйте пізніше',
    }
  }
};