export const Loading = () => {
  //Skeleton de carregamento para os cards de Pokemon
  const skeletonCards = Array(8).fill(0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {skeletonCards.map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 animate-pulse"
        >
          <div className="w-full h-44 bg-slate-100 rounded-2xl mb-4 flex justify-center items-center">
            <div className="w-24 h-24 bg-slate-200 rounded-full"></div>
          </div>
          <div className="h-6 bg-slate-200 rounded w-3/4 mx-auto mb-3"></div>
          <div className="flex justify-center gap-2 mt-auto">
            <div className="h-6 bg-slate-200 rounded-full w-16"></div>
            <div className="h-6 bg-slate-200 rounded-full w-16"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
