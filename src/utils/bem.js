export const getClassNames = (block, mods) => {
  const result = { [block]: true };

  if (Array.isArray(mods)) {
    mods.forEach((mod) => {
      result[`${block}_${mod}`] = true;
    });
  } else {
    result[`${block}_${mods}`] = true;
  }

  return result;
};
