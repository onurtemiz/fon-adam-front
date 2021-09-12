import { Modal } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FooterContainerStyles, {
  FooterWrapper,
  LeftSide,
  RightSide,
  Copyright,
  FooterItem,
  Contact,
} from './styles';

const FooterContainer = () => {
  const [visible, setVisible] = useState(false);

  return (
    <FooterContainerStyles>
      <Modal visible={visible} footer={null} onCancel={() => setVisible(false)}>
        <p>
          Tüm veriler ve bilgiler, yalnızca bilgilendirme amacıyla "olduğu gibi"
          sağlanmış olup alım satım amaçlı veya finansal, yatırım, vergi, yasal,
          muhasebe ya da diğer konularda tavsiye niteliğinde değildir. Lütfen
          her türlü alım satım işleminden önce fiyatları doğrulamak için aracı
          kurumunuza veya mali temsilcinize danışın. Fon Adam; yatırım
          danışmanı, mali danışman ya da hisse senedi aracısı değildir. Veri ve
          bilgilerin hiçbiri, bir menkul kıymetin ya da finansal ürünün satın
          alınmasına, satılmasına veya tutulmasına yönelik Fon Adam tarafından
          yapılan bir yatırım tavsiyesi, teklif, öneri ya da talep değildir. Fon
          Adam, herhangi bir yatırımın tavsiye edilebilirliği veya uygunluğu
          konusunda hiçbir taahhütte bulunmaz. Veri ve bilgilerin hiçbiri, genel
          ya da özel yatırım tavsiyesi değildir. Bu tür veri ve bilgilerde
          atıfta bulunulan finansal ürünler ya da işlemler, yatırım profilinize
          ve yatırım hedeflerinize veya beklentilerinize uygun olmayabilir.
          Herhangi bir finansal ürün veya faaliyetin ilgi alanlarınıza, yatırım
          hedeflerinize, yatırım görüşünüze ve risk anlayışınıza göre size uygun
          olup olmadığını değerlendirmek sizin sorumluluğunuzdadır. Fon Adam, bu
          kapsamda atıfta bulunulan finansal ürünlerle ilgili herhangi bir
          işlemden veya yatırımdan kaynaklanan zararlardan sorumlu tutulamaz.
          Fon Adam, herhangi bir yatırım kararının yalnızca sağlanan veri ve
          bilgilere dayanarak verilmesini önermez. Veriler, finans borsaları ve
          diğer içerik sağlayıcıları tarafından sağlanmakta olup finans
          borsalarının veya diğer veri sağlayıcılarının belirttiği şekilde
          gecikmeli olabilir. Fon Adam hiçbir veriyi doğrulamaz ve bunu yapma
          yükümlülüğünü reddeder.Fon Adam, veri veya içerik sağlayıcıları,
          finansal borsalar ve bağlı kuruluşlarının her biri ile iş ortakları
          (A) herhangi bir verinin doğru, yeterli veya eksiksiz olduğunu açık
          şekilde reddeder ve (B) bu tür verilerdeki hatalardan, eksikliklerden
          veya diğer kusurlardan, gecikmelerden, kesintilerden ya da bunlara
          dayanarak yapılan hiçbir işlemden sorumlu tutulamaz. Fon Adam veya
          veri sağlayıcılarımız, burada sunulan verileri kullanmanız nedeniyle
          oluşabilecek herhangi bir zarardan sorumlu değildir. Burada
          kullanıldığı şekliyle "iş ortakları" deyimi, Fon Adam ile bu taraflar
          arasındaki aracılık, ortaklık veya ortak girişim ilişkisini ifade
          etmez. Burada bulunan hiçbir veri veya bilgi ile ilgili olarak önceden
          yazılı izin almadan kopyalama, değiştirme, yeniden biçimlendirme,
          indirme, depolama, yeniden oluşturma, yeniden işleme, iletme ya da
          yeniden dağıtma işlemi yapmayacağınızı ve bu veri veya bilgileri
          ticari bir kurumda kullanmayacağınızı kabul edersiniz. Fon Adam ve
          üçüncü taraf veri veya içerik sağlayıcıları, sunulan verilerin ve
          bilgilerin münhasır mülkiyet haklarına sahiptir.
        </p>
      </Modal>
      <FooterWrapper>
        <LeftSide>
          <Copyright>©{new Date().getFullYear()} Onur Temiz.</Copyright>
          <Contact>
            İletişim:{' '}
            <b>
              <a href="mailto:iletisim@bouncim.com">iletisim@bouncim.com</a>
            </b>
          </Contact>
        </LeftSide>
        <RightSide>
          <FooterItem>
            <Link to="/privacy">Gizlilik Sözleşmesi</Link>
          </FooterItem>
          <FooterItem>
            <Link to="/terms">Üyelik Sözleşmesi</Link>
          </FooterItem>
          <FooterItem onClick={() => setVisible(true)}>
            Sorumluluk Reddi
          </FooterItem>
        </RightSide>
      </FooterWrapper>
    </FooterContainerStyles>
  );
};

export default FooterContainer;
