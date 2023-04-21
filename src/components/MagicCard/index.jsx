const MagicCard = ({ children }) => (
  <section className='magicCard'>
    <div className='magicCard__wrapper'>
      <div>
        <img src="https://cloud.modyocdn.com/uploads/85360c7a-90f1-49ce-b6a0-994543a3cfad/original/cat.jpg" alt='Lovely Cat' />
      </div>
      <div>
        { children }
      </div>
    </div>
  </section>
);

export default MagicCard;